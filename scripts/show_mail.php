<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();
echo "config:" . config('mail.mailers.smtp.username') . PHP_EOL;
echo "env:" . env('MAIL_USERNAME') . PHP_EOL;
echo "getenv:" . getenv('MAIL_USERNAME') . PHP_EOL;
echo "from address:" . config('mail.from.address') . PHP_EOL;
echo "mailer host:" . config('mail.mailers.smtp.host') . PHP_EOL;
echo "mailer encryption:" . config('mail.mailers.smtp.encryption') . PHP_EOL;
echo "env encryption:" . env('MAIL_ENCRYPTION') . PHP_EOL;
