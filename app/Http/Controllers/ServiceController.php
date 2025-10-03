<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Slide;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ServiceController extends Controller
{

    public function index()
    {
        $slide = Slide::inRandomOrder()->first();
        $services = Service::all();

        return Inertia::render('web/services/Index', [
            'images' => [$slide],
            'services' => $services
        ]);
    }

    /**
     * Display a listing of the services for admin.
     */
    public function Adminindex()
    {
        $services = Service::latest()->get();

        return inertia('admin/services/Index', [
            'services' => $services
        ]);
    }

    /**
     * Show the form for creating a new service.
     */
    public function create()
    {
        return inertia('admin/services/Create');
    }

    /**
     * Store a newly created service in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'icon' => 'required|string|max:50',
            'description' => 'required|string|max:500',
            'long_description' => 'required|string',
            'features' => 'required|array|min:1',
            'features.*' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        // Store new image
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images/services'), $filename);
            $imagePath = '/images/services/' . $filename;
        } else {
            $imagePath = null;
        }

        // Filter out empty features
        $features = array_filter($request->features, function ($feature) {
            return !empty(trim($feature));
        });

        $service = Service::create([
            'title' => $request->title,
            'image' => $imagePath,
            'icon' => $request->icon,
            'description' => $request->description,
            'long_description' => $request->long_description,
            'features' => $features,
        ]);

        return redirect()->route('admin.services.index')
            ->with('success', 'Service created successfully!');
    }

    /**
     * Show the form for editing the specified service.
     */
    public function edit(Service $service)
    {
        return inertia('admin/services/Edit', [
            'service' => $service
        ]);
    }

    /**
     * Update the specified service in storage.
     */
    public function update(Request $request, Service $service)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'icon' => 'required|string|max:50',
            'description' => 'required|string|max:500',
            'long_description' => 'required|string',
            'features' => 'required|array|min:1',
            'features.*' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        // Handle image upload
        $imagePath = $service->image;
        if ($request->hasFile('image')) {

            // Delete associated image
            if ($service->image && !str_starts_with($service->image, 'http')) {
                Storage::disk('public')->delete($service->image);
            }

            // Store new image
            $file = $request->file('image');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images/services'), $filename);
            $imagePath = '/images/services/' . $filename;
        } elseif ($request->has('existing_image')) {
            $imagePath = $request->existing_image;
        }

        // Filter out empty features
        $features = array_filter($request->features, function ($feature) {
            return !empty(trim($feature));
        });

        $service->update([
            'title' => $request->title,
            'image' => $imagePath,
            'icon' => $request->icon,
            'description' => $request->description,
            'long_description' => $request->long_description,
            'features' => $features,
        ]);

        return redirect()->route('admin.services.index')
            ->with('success', 'Service updated successfully!');
    }

    /**
     * Remove the specified service from storage.
     */
    public function destroy(Service $service)
    {
        // Delete old image
        $oldImage = $service->image;
        if ($oldImage && file_exists(public_path($oldImage))) {
            unlink(public_path($oldImage));
        }

        $service->delete();

        return redirect()->route('admin.services.index')
            ->with('success', 'Service deleted successfully!');
    }

    /**
     * Handle image upload via AJAX (optional)
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048'
        ]);

        $path = $request->file('image')->store('services', 'public');

        return response()->json([
            'path' => $path,
            'url' => asset('storage/' . $path)
        ]);
    }
}
