<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Contact;
use Illuminate\Support\Facades\DB as FacadesDB;

class DashBoardController extends Controller
{

    public function index(): Response
    {
        $messages = Contact::latest()->get();

        $totalMessages = Contact::count();
        $unreadMessages = Contact::where('is_read', false)->count();
        $readMessages = Contact::where('is_read', true)->count();

        // Calculate trend
        $previousPeriodCount = Contact::where('created_at', '<', now()->subDays(30))->count();
        $currentPeriodCount = Contact::where('created_at', '>=', now()->subDays(30))->count();
        $messagesTrend = $previousPeriodCount > 0
            ? round((($currentPeriodCount - $previousPeriodCount) / $previousPeriodCount) * 100, 1)
            : 0;

        // Chart data for last 7 days
        $chartData = [
            'labels' => [],
            'data' => []
        ];

        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $chartData['labels'][] = $date->format('D');
            $chartData['data'][] = Contact::whereDate('created_at', $date)->count();
        }

        // Subject distribution
        $subjectDistribution = Contact::select('subject', FacadesDB::raw('count(*) as count'))
            ->groupBy('subject')
            ->get()
            ->map(function ($item) {
                return [
                    'subject' => $item->subject,
                    'count' => $item->count
                ];
            });

        return inertia('admin/dashboard', [
            'messages' => $messages,
            'stats' => [
                'totalMessages' => $totalMessages,
                'unreadMessages' => $unreadMessages,
                'readMessages' => $readMessages,
                'messagesTrend' => $messagesTrend,
                'responseRate' => 85,
            ],
            'chartData' => $chartData,
            'subjectDistribution' => $subjectDistribution,
        ]);
    }
}
