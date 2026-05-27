<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReportMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $filename,
        public string $fileContent,
        public string $dateFrom,
        public string $dateTo,
        public array $reportTypes,
        public string $senderName,
        public string $senderEmail,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Laba101 Report — ' . $this->dateFrom . ' to ' . $this->dateTo,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.report',
        );
    }

    /**
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [
            Attachment::fromData(fn () => $this->fileContent, $this->filename)
                ->withMime('application/vnd.ms-excel'),
        ];
    }
}
