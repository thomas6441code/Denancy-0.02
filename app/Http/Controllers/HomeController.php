<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use App\Models\Slide;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{

    public function index(): Response
    {
        $slides = Slide::all();
        $slide = Slide::inRandomorder()->first();
        $faqs = Faq::take(8)->get();
        $testimonials = Testimonial::take(5)->get();

        return Inertia::render('web/home', [
            'images' => $slides,
            'image' => $slide,
            'faqs' => $faqs,
            'testimonials' => $testimonials,
        ]);
    }
}
