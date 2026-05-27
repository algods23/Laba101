<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Receipt {{ $order->order_number }} - Laba101</title>
    <style>
        body { margin: 0; background: #eef3ff; color: #061a42; font-family: Arial, sans-serif; }
        .receipt { width: 360px; max-width: calc(100vw - 32px); margin: 24px auto; background: #fff; border: 1px solid #c8d3ea; border-radius: 18px; padding: 22px; }
        .center { text-align: center; }
        .muted { color: #5c6a86; }
        .row { display: flex; justify-content: space-between; gap: 16px; margin-top: 10px; }
        .line { border-top: 1px dashed #c8d3ea; margin: 18px 0; }
        .total { font-size: 22px; font-weight: 800; }
        .payment { border: 1px solid #d8e1f5; border-radius: 12px; padding: 10px; margin-top: 8px; }
        .payment:first-child { margin-top: 0; }
        button { width: 100%; height: 44px; margin-top: 18px; border: 0; border-radius: 14px; background: #061a42; color: white; font-weight: 800; cursor: pointer; }
        @media print {
            body { background: #fff; }
            .receipt { margin: 0 auto; border: 0; border-radius: 0; }
            button { display: none; }
        }
    </style>
</head>
<body>
    <main class="receipt">
        <div class="center">
            <img src="{{ asset('laba101-logo.svg') }}" alt="Laba101" style="height: 56px; margin: 0 auto 8px;">
            <h1 style="margin: 0; font-size: 20px;">Order Receipt</h1>
            <p class="muted" style="margin: 4px 0 0;">{{ now()->format('M d, Y h:i A') }}</p>
        </div>

        <div class="line"></div>

        <div class="row"><strong>Ticket</strong><span>{{ $order->order_number }}</span></div>
        <div class="row"><strong>Customer</strong><span>{{ $order->customer->name }}</span></div>
        <div class="row"><strong>Service</strong><span>{{ $order->service->name }}</span></div>
        <div class="row"><strong>Branch</strong><span>{{ $order->branch }}</span></div>

        <div class="line"></div>

        <h2 style="margin: 0 0 10px; font-size: 16px;">Payments</h2>
        @forelse ($order->payments as $payment)
            <div class="payment">
                <div class="row" style="margin-top: 0;"><strong>{{ strtoupper($payment->payment_method) }}</strong><strong>PHP {{ number_format((float) $payment->amount, 2) }}</strong></div>
                <div class="row muted"><span>Date</span><span>{{ $payment->received_at?->format('M d, Y h:i A') ?: $payment->created_at->format('M d, Y h:i A') }}</span></div>
                @if ($payment->payment_reference)
                    <div class="row muted"><span>Reference</span><span>{{ $payment->payment_reference }}</span></div>
                @endif
            </div>
        @empty
            <p class="muted" style="margin: 0;">No payments recorded.</p>
        @endforelse

        <div class="line"></div>

        <div class="row muted"><span>Order total</span><span>PHP {{ number_format((float) $order->total_amount, 2) }}</span></div>
        <div class="row muted"><span>Total paid</span><span>PHP {{ number_format((float) $order->paid_amount, 2) }}</span></div>
        <div class="row muted"><span>Balance</span><span>PHP {{ number_format($order->balance, 2) }}</span></div>

        <button type="button" onclick="window.print()">Print receipt</button>
    </main>
</body>
</html>
