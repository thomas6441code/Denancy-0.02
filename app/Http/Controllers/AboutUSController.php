<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Service;
use App\Models\Slide;
use App\Models\Stat;
use Inertia\Inertia;
use Inertia\Response;

class AboutUSController extends Controller
{

    public function index(): Response
    {
        $slides = Slide::inRandomOrder()->first();
        $slide = Service::inRandomOrder()->first();
        $stats = Stat::all();
        $leaders = Member::all();

        return Inertia::render('web/aboutus/Index', [
            'images' => [$slides],
            'image' => $slide,
            'stats' => $stats,
            'members' => $leaders
        ]);
    }
}
