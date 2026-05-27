<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; background: #f4f7fc; margin: 0; padding: 40px 20px; }
        .container { max-width: 520px; margin: 0 auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(6,26,66,0.08); }
        .header { background: #061a42; color: #fff; padding: 28px 32px; }
        .header h1 { margin: 0; font-size: 20px; font-weight: 800; }
        .header p { margin: 6px 0 0; font-size: 13px; color: #a8b8dc; }
        .body { padding: 28px 32px; }
        .info { background: #f8fbff; border: 1px solid #d8e1f5; border-radius: 12px; padding: 16px 20px; margin-bottom: 20px; }
        .info-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; }
        .info-label { color: #5c6a86; font-weight: 600; }
        .info-value { color: #061a42; font-weight: 700; }
        .note { font-size: 13px; color: #5c6a86; line-height: 1.6; }
        .footer { padding: 20px 32px; border-top: 1px solid #eef2fa; text-align: center; }
        .footer p { margin: 0; font-size: 12px; color: #8899b8; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 Laba101 Report Export</h1>
            <p>Automated report delivery</p>
        </div>
        <div class="body">
            <div class="info">
                <div class="info-row">
                    <span class="info-label">Date From</span>
                    <span class="info-value">{{ $dateFrom }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Date To</span>
                    <span class="info-value">{{ $dateTo }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Reports</span>
                    <span class="info-value">{{ implode(', ', array_map('ucfirst', $reportTypes)) }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Sent by</span>
                    <span class="info-value">{{ $senderName }} ({{ $senderEmail }})</span>
                </div>
            </div>
            <p class="note">
                Your exported report is attached to this email as an Excel file.
                Open the attachment to view the full report details.
            </p>
        </div>
        <div class="footer">
            <p>&copy; {{ date('Y') }} Laba101 Laundry — All rights reserved</p>
        </div>
    </div>
</body>
</html>
