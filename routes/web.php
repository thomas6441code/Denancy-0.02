<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('web/home');
})->name('home');

Route::get('/aboutus', function () {
    return Inertia::render('web/aboutus/Index');
})->name('aboutus');

Route::get('/services', function () {
    return Inertia::render('web/services/Index');
})->name('services');

Route::get('/contactus', function () {
    return Inertia::render('web/contactus/Index');
})->name('contactus');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
