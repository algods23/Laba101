package com.laba101.mobile;

import android.Manifest;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothManager;
import android.bluetooth.BluetoothSocket;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Build;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;

import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Set;
import java.util.UUID;

@CapacitorPlugin(
    name = "BluetoothThermalPrinter",
    permissions = {
        @Permission(strings = { Manifest.permission.BLUETOOTH_CONNECT, Manifest.permission.BLUETOOTH_SCAN }, alias = "bluetooth")
    }
)
public class BluetoothThermalPrinterPlugin extends Plugin {
    private static final String PREFS = "laba101_bluetooth_printer";
    private static final String PREF_ADDRESS = "printer_address";
    private static final UUID SPP_UUID = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
    private static final Charset PRINTER_CHARSET = Charset.forName("CP437");

    private BluetoothAdapter adapter;
    private BluetoothSocket socket;
    private String connectedAddress;

    @Override
    public void load() {
        BluetoothManager manager = (BluetoothManager) getContext().getSystemService(Context.BLUETOOTH_SERVICE);
        adapter = manager != null ? manager.getAdapter() : BluetoothAdapter.getDefaultAdapter();
    }

    @PluginMethod
    public void requestBluetoothPermissions(PluginCall call) {
        if (!hasBluetoothPermission()) {
            requestPermissionForAlias("bluetooth", call, "permissionsCallback");
            return;
        }
        JSObject ret = new JSObject();
        ret.put("granted", true);
        call.resolve(ret);
    }

    @PermissionCallback
    private void permissionsCallback(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("granted", hasBluetoothPermission());
        call.resolve(ret);
    }

    @PluginMethod
    public void listPairedPrinters(PluginCall call) {
        if (!ensureReady(call)) return;

        JSArray printers = new JSArray();
        try {
            Set<BluetoothDevice> bondedDevices = adapter.getBondedDevices();
            for (BluetoothDevice device : bondedDevices) {
                JSObject row = new JSObject();
                row.put("name", device.getName() != null ? device.getName() : "Bluetooth Printer");
                row.put("address", device.getAddress());
                row.put("bondState", device.getBondState());
                printers.put(row);
            }
            JSObject ret = new JSObject();
            ret.put("printers", printers);
            ret.put("savedAddress", getSavedAddress());
            call.resolve(ret);
        } catch (SecurityException ex) {
            call.reject("Bluetooth permission denied.");
        }
    }

    @PluginMethod
    public void savePrinter(PluginCall call) {
        String address = call.getString("address", "");
        if (address.isEmpty()) {
            call.reject("Printer address is required.");
            return;
        }
        prefs().edit().putString(PREF_ADDRESS, address).apply();
        JSObject ret = new JSObject();
        ret.put("address", address);
        call.resolve(ret);
    }

    @PluginMethod
    public void getSavedPrinter(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("address", getSavedAddress());
        ret.put("connected", isConnected());
        call.resolve(ret);
    }

    @PluginMethod
    public void connect(PluginCall call) {
        if (!ensureReady(call)) return;
        String address = call.getString("address", getSavedAddress());
        if (address == null || address.isEmpty()) {
            call.reject("Select a paired printer first.");
            return;
        }

        try {
            connectToAddress(address);
            prefs().edit().putString(PREF_ADDRESS, address).apply();
            JSObject ret = new JSObject();
            ret.put("connected", true);
            ret.put("address", address);
            call.resolve(ret);
        } catch (Exception ex) {
            closeSocket();
            call.reject("Printer connection failed: " + ex.getMessage());
        }
    }

    @PluginMethod
    public void disconnect(PluginCall call) {
        closeSocket();
        JSObject ret = new JSObject();
        ret.put("connected", false);
        call.resolve(ret);
    }

    @PluginMethod
    public void printReceipt(PluginCall call) {
        if (!ensureReady(call)) return;
        String address = call.getString("address", getSavedAddress());
        if (address == null || address.isEmpty()) {
            call.reject("Select a paired printer first.");
            return;
        }

        try {
            if (!isConnected() || !address.equals(connectedAddress)) {
                connectToAddress(address);
            }
            byte[] payload = buildReceiptBytes(call);
            OutputStream output = socket.getOutputStream();
            output.write(payload);
            output.flush();
            JSObject ret = new JSObject();
            ret.put("printed", true);
            ret.put("address", address);
            call.resolve(ret);
        } catch (Exception ex) {
            closeSocket();
            call.reject("Printer disconnected or unavailable: " + ex.getMessage());
        }
    }

    @PluginMethod
    public void printDailySummary(PluginCall call) {
        if (!ensureReady(call)) return;
        String address = call.getString("address", getSavedAddress());
        if (address == null || address.isEmpty()) {
            call.reject("Select a paired printer first.");
            return;
        }

        try {
            if (!isConnected() || !address.equals(connectedAddress)) {
                connectToAddress(address);
            }
            byte[] payload = buildDailySummaryBytes(call);
            OutputStream output = socket.getOutputStream();
            output.write(payload);
            output.flush();
            JSObject ret = new JSObject();
            ret.put("printed", true);
            ret.put("address", address);
            call.resolve(ret);
        } catch (Exception ex) {
            closeSocket();
            call.reject("Printer disconnected or unavailable: " + ex.getMessage());
        }
    }

    private boolean ensureReady(PluginCall call) {
        if (adapter == null) {
            call.reject("Bluetooth is not available on this device.");
            return false;
        }
        if (!adapter.isEnabled()) {
            call.reject("Bluetooth is disabled.");
            return false;
        }
        if (!hasBluetoothPermission()) {
            call.reject("Bluetooth permission is required.");
            return false;
        }
        return true;
    }

    private boolean hasBluetoothPermission() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) return true;
        return getPermissionState("bluetooth") == PermissionState.GRANTED;
    }

    private void connectToAddress(String address) throws IOException, SecurityException {
        if (isConnected() && address.equals(connectedAddress)) return;
        closeSocket();
        BluetoothDevice device = adapter.getRemoteDevice(address);
        adapter.cancelDiscovery();
        BluetoothSocket nextSocket = device.createRfcommSocketToServiceRecord(SPP_UUID);
        nextSocket.connect();
        socket = nextSocket;
        connectedAddress = address;
    }

    private boolean isConnected() {
        return socket != null && socket.isConnected();
    }

    private void closeSocket() {
        try {
            if (socket != null) socket.close();
        } catch (IOException ignored) {
        }
        socket = null;
        connectedAddress = null;
    }

    private SharedPreferences prefs() {
        return getContext().getSharedPreferences(PREFS, Context.MODE_PRIVATE);
    }

    private String getSavedAddress() {
        return prefs().getString(PREF_ADDRESS, "");
    }

    private byte[] buildReceiptBytes(PluginCall call) throws Exception {
        int paperWidth = call.getInt("paperWidth", 58);
        int lineWidth = paperWidth >= 80 ? 42 : 32;
        String storeName = call.getString("storeName", "Laba101");
        String receiptNumber = call.getString("receiptNumber", "");
        String dateTime = call.getString("dateTime", new SimpleDateFormat("MMM dd, yyyy h:mm a", Locale.US).format(new Date()));
        double totalAmount = call.getDouble("totalAmount", 0.0);
        double paidAmount = call.getDouble("paidAmount", 0.0);
        double changeAmount = call.getDouble("changeAmount", 0.0);
        double balanceAmount = call.getDouble("balanceAmount", totalAmount - paidAmount);
        String customerName = call.getString("customerName", "");
        String customerPhone = call.getString("customerPhone", "");
        String staffName = call.getString("staffName", "");
        JSArray items = call.getArray("items", new JSArray());

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        out.write(new byte[] { 0x1B, 0x40 });
        out.write(new byte[] { 0x1B, 0x61, 0x01 });
        out.write(new byte[] { 0x1B, 0x45, 0x01 });
        writeLine(out, storeName.toUpperCase(Locale.US));
        out.write(new byte[] { 0x1B, 0x45, 0x00 });
        writeLine(out, "Receipt " + receiptNumber);
        writeLine(out, dateTime);
        out.write(new byte[] { 0x1B, 0x61, 0x00 });
        writeLine(out, repeat('-', lineWidth));
        
        if (customerName != null && !customerName.isEmpty()) {
            writeLine(out, "Customer: " + customerName);
        }
        if (customerPhone != null && !customerPhone.isEmpty()) {
            writeLine(out, "Phone: " + customerPhone);
        }
        writeLine(out, repeat('-', lineWidth));
        writeLine(out, fitColumns("ITEM", "QTY", "PRICE", lineWidth));
        writeLine(out, repeat('-', lineWidth));

        for (int i = 0; i < items.length(); i++) {
            Object raw = items.get(i);
            if (!(raw instanceof JSONObject)) continue;
            JSONObject item = (JSONObject) raw;
            String name = item.optString("name", "Item");
            int quantity = Math.max(1, item.optInt("quantity", 1));
            double price = item.optDouble("price", 0);
            writeLine(out, fitColumns(name, quantity + " x", currency(price), lineWidth));
        }

        writeLine(out, repeat('-', lineWidth));
        out.write(new byte[] { 0x1B, 0x45, 0x01 });
        writeLine(out, fitColumns("TOTAL", "", currency(totalAmount), lineWidth));
        writeLine(out, fitColumns("PAID", "", currency(paidAmount), lineWidth));
        writeLine(out, fitColumns("CHANGE", "", currency(changeAmount), lineWidth));
        writeLine(out, fitColumns("BALANCE", "", currency(balanceAmount), lineWidth));
        out.write(new byte[] { 0x1B, 0x45, 0x00 });
        writeLine(out, "");
        out.write(new byte[] { 0x1B, 0x61, 0x01 });
        writeLine(out, "Thank you!");
        writeLine(out, "");
        if (staffName != null && !staffName.isEmpty()) {
            writeLine(out, "Staff: " + staffName);
        }
        writeLine(out, "");
        writeLine(out, "");
         writeLine(out, "");
        writeLine(out, "");
        out.write(new byte[] { 0x1D, 0x56, 0x00 });
        return out.toByteArray();
    }

    private byte[] buildDailySummaryBytes(PluginCall call) throws Exception {
        int paperWidth = call.getInt("paperWidth", 58);
        int lineWidth = paperWidth >= 80 ? 42 : 32;
        String storeName = call.getString("storeName", "Laba101");
        String dateTime = call.getString("dateTime", new SimpleDateFormat("MMM dd, yyyy h:mm a", Locale.US).format(new Date()));
        String staffName = call.getString("staffName", "");
        double paidToday = call.getDouble("paidToday", 0.0);
        double cashPaidToday = call.getDouble("cashPaidToday", 0.0);
        double gcashPaidToday = call.getDouble("gcashPaidToday", 0.0);
        double disbursementToday = call.getDouble("disbursementToday", 0.0);
        double cashOnHandToday = call.getDouble("cashOnHandToday", 0.0);

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        out.write(new byte[] { 0x1B, 0x40 });
        out.write(new byte[] { 0x1B, 0x61, 0x01 });
        out.write(new byte[] { 0x1B, 0x45, 0x01 });
        writeLine(out, storeName.toUpperCase(Locale.US));
        out.write(new byte[] { 0x1B, 0x45, 0x00 });
        writeLine(out, "DAILY SUMMARY");
        writeLine(out, dateTime);
        out.write(new byte[] { 0x1B, 0x61, 0x00 });
        writeLine(out, repeat('-', lineWidth));
        writeLine(out, "");
        out.write(new byte[] { 0x1B, 0x45, 0x01 });
        writeLine(out, fitColumns("PAID TODAY:", "", currency(paidToday), lineWidth));
        writeLine(out, fitColumns("CASH:", "", currency(cashPaidToday), lineWidth));
        writeLine(out, fitColumns("GCASH:", "", currency(gcashPaidToday), lineWidth));
        writeLine(out, fitColumns("DISBURSEMENT:", "", currency(disbursementToday), lineWidth));
        writeLine(out, fitColumns("CASH ON HAND:", "", currency(cashOnHandToday), lineWidth));
        out.write(new byte[] { 0x1B, 0x45, 0x00 });
        writeLine(out, "");
        writeLine(out, repeat('-', lineWidth));
        out.write(new byte[] { 0x1B, 0x61, 0x01 });
        
        writeLine(out, "");
        if (staffName != null && !staffName.isEmpty()) {
            writeLine(out, "Staff: " + staffName);
        }
        writeLine(out, "");
        writeLine(out, "");
        writeLine(out, "");
        writeLine(out, "");
        out.write(new byte[] { 0x1D, 0x56, 0x00 });
        return out.toByteArray();
    }

    private void writeLine(ByteArrayOutputStream out, String line) throws IOException {
        out.write((line + "\n").getBytes(PRINTER_CHARSET));
    }

    private String fitColumns(String left, String middle, String right, int width) {
        String rightText = (middle == null || middle.isEmpty()) ? right : middle + " " + right;
        int rightWidth = Math.min(width / 2, rightText.length());
        int leftWidth = Math.max(8, width - rightWidth - 1);
        String trimmedLeft = left.length() > leftWidth ? left.substring(0, leftWidth) : left;
        return padRight(trimmedLeft, width - rightText.length()) + rightText;
    }

    private String padRight(String value, int width) {
        if (value.length() >= width) return value;
        return value + repeat(' ', width - value.length());
    }

    private String repeat(char character, int count) {
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < count; i++) builder.append(character);
        return builder.toString();
    }

    private String currency(double value) {
        return String.format(Locale.US, "P%.2f", value);
    }
}
