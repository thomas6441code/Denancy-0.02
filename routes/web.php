<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\StatController;
use App\Http\Controllers\SlideController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\contact\ContactusController;



/*|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|  Here is where you can register web routes for your application. These
|  are loaded by the RouteServiceProvider within a group which
|  contains the "web" middleware group. Now create something great!
|--------------------------------------------------------------------------*/


Route::get('/', function () {
    return Inertia::render('web/home');
})->name('home');


/* Clients routes  */
Route::get('/home', function () {
    return Inertia::render('web/home');
})->name('homeextra');

Route::get('/aboutus', function () {
    return Inertia::render('web/aboutus/Index');
})->name('aboutus');

Route::get('/services', function () {
    return Inertia::render('web/services/Index');
})->name('services');

Route::get('/contactus', function () {
    return Inertia::render('web/contactus/Index');
})->name('contactus');

Route::post('/api/contactus', [ContactusController::class, 'submit'])->name('contactus.submit');


/* Admin routes */
Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {

    Route::get('/slides', [SlideController::class, 'index'])->name('slides');

    Route::post('/slides', [SlideController::class, 'store'])->name('store.slides');

    Route::get('/contacts', [ContactusController::class, 'adminIndex'])->name('contacts');

    Route::get('/contacts', [ContactusController::class, 'adminIndex'])->name('contacts');

    Route::get('/stats', [StatController::class, 'index'])->name('admin.stats.StatsAdmin');
    Route::get('/stats/create', [StatController::class, 'create'])->name('admin.stats.create');
    Route::post('/stats', [StatController::class, 'store'])->name('admin.stats.store');
    Route::get('/stats/edit/{stat}', [StatController::class, 'edit'])->name('admin.stats.edit');
    Route::put('/stats/{stat}', [StatController::class, 'update'])->name('admin.stats.update');
    Route::delete('/stats/{stat}', [StatController::class, 'destroy'])->name('admin.stats.destroy');

    Route::get('/faqs', [FaqController::class, 'index'])->name('admin.faqs.FaqsAdmin');
    Route::get('/faqs/create', [FaqController::class, 'create'])->name('admin.faqs.create');
    Route::post('/faqs', [FaqController::class, 'store'])->name('admin.faqs.store');
    Route::get('/faqs/edit/{faq}', [FaqController::class, 'edit'])->name('admin.faqs.edit');
    Route::put('/faqs/{faq}', [FaqController::class, 'update'])->name('admin.faqs.update');
    Route::delete('/faqs/{faq}', [FaqController::class, 'destroy'])->name('admin.faqs.destroy');

    Route::get('/teams', [MemberController::class, 'index'])->name('admin.teams.teamsAdmin');
    Route::get('/team', [MemberController::class, 'indexteams']);
    Route::post('/teams', [MemberController::class, 'store']);
    Route::put('/teams/{member}', [MemberController::class, 'update']);
    Route::delete('/teams/{member}', [MemberController::class, 'destroy']);

    Route::get('/services', [ServiceController::class, 'Adminindex'])->name('admin.services.index');
    Route::get('/services/create', [ServiceController::class, 'create'])->name('admin.services.create');
    Route::post('/services', [ServiceController::class, 'store'])->name('admin.services.store');
    Route::get('/services/edit/{service}', [ServiceController::class, 'edit'])->name('admin.services.edit');
    Route::match(['put', 'post'], '/services/{service}', [ServiceController::class, 'update'])->name('admin.services.update');
    Route::delete('/services/{service}', [ServiceController::class, 'destroy'])->name('admin.services.destroy');


    Route::get('/testimonials', [TestimonialController::class, 'index'])->name('admin.testimonials.index');
    Route::get('/testimonials/create', [TestimonialController::class, 'create'])->name('admin.testimonials.create');
    Route::post('/testimonials', [TestimonialController::class, 'store'])->name('admin.testimonials.store');
    Route::get('/testimonials/edit/{testimonial}', [TestimonialController::class, 'edit'])->name('admin.testimonials.edit');
    Route::put('/testimonials/{testimonial}', [TestimonialController::class, 'update'])->name('admin.testimonials.update');
    Route::delete('/testimonials/{testimonial}', [TestimonialController::class, 'destroy'])->name('admin.testimonials.destroy');
});

Route::middleware(['verified', 'auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('dashboard');

    Route::get('/api/admin/contacts', [ContactusController::class, 'getall'])->name('api.contacts');
    Route::put('/api/admin/contacts/read/{contact}', [ContactusController::class, 'markAsRead'])->name('api.read.contacts');
    Route::put('/api/admin/contacts/unread/{contact}', [ContactusController::class, 'markAsUnRead'])->name('api.unread.contacts');
    Route::delete('/api/admin/contacts/{contact}', [ContactusController::class, 'destroy'])->name('api.delete.contacts');
});

/* Test Apis */

Route::prefix('api')->group(function () {
    Route::get('/slides', [SlideController::class, 'index']);
    Route::get('/testimonials', [TestimonialController::class, 'indextestimonials']);
    Route::get('/faqs', [FaqController::class, 'indexfaqs']);
    Route::post('/messages', [ContactusController::class, 'store'])->name('message.store');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
