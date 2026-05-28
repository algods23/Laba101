<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\Mail;

$to = 'aletabaranza23@gmail.com';
$filename = 'test-report.xls';
$fileContent = "Date,Value\n2026-05-28,100";
$dateFrom = '2026-05-28';
$dateTo = '2026-05-28';
$reportTypes = ['sales'];
$senderName = 'Laba101 Test';
$senderEmail = config('mail.from.address') ?? 'noreply@example.com';

try {
    Mail::to($to)->send(new App\Mail\ReportMail($filename, $fileContent, $dateFrom, $dateTo, $reportTypes, $senderName, $senderEmail));
    echo "Mail send invoked successfully.\n";
} catch (Exception $e) {
    echo "Mail send failed: " . $e->getMessage() . "\n";
}

// show recent laravel log tail
$log = __DIR__ . '/../storage/logs/laravel.log';
if (file_exists($log)) {
    echo "\n--- last 40 lines of laravel.log ---\n";
    $lines = array_slice(file($log), -40);
    echo implode('', $lines);
}
