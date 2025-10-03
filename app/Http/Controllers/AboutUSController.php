<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Slide;
use App\Models\Stat;
use Inertia\Inertia;
use Inertia\Response;

class AboutUSController extends Controller
{

    public function index(): Response
    {
        $slide = Slide::inRandomOrder()->first();
        $stats = Stat::all();
        $leaders = Member::all();

        return Inertia::render('web/aboutus/Index', [
            'images' => [$slide],
            'stats' => $stats,
            'members' => $leaders
        ]);
    }
}
