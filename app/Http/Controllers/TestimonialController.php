<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class TestimonialController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/testimonials/Index', [
            'testimonials' => Testimonial::latest()->get(),
        ]);
    }

    // Show create form
    public function create()
    {
        return Inertia::render('admin/testimonials/Create');
    }

    // Store the testimonials new
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'content' => 'required|string',
            'role' => 'required|string',
            'rating' => 'required|numeric|between:0,5',
            'category' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:3048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();

        // Store new image
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images/testimonials'), $filename);
            $validated['image'] = '/images/testimonials/' . $filename;
        }

        // Create the testimonial
        $testimonial = Testimonial::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Testimonial created successfully!',
            'data' => $testimonial
        ], 201);
    }

    // Show edit form
    public function edit(Testimonial $testimonial)
    {
        return Inertia::render('admin/testimonials/Edit', [
            'testimonial' => $testimonial,
        ]);
    }

    // Updating the testimonial
    public function update(Request $request, Testimonial $testimonial)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'content' => 'required|string',
            'role' => 'required|string',
            'rating' => 'required|numeric|between:0,5',
            'category' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:3048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $validated = $validator->validated();

        if ($request->hasFile('image')) {
            // Delete old image
            $oldImage = $testimonial->image;
            if ($oldImage && file_exists(public_path($oldImage))) {
                unlink(public_path($oldImage));
            }

            // Store new image
            $file = $request->file('image');
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images/testimonials'), $filename);
            $validated['image'] = '/images/testimonials/' . $filename;
        } else {
            // Keep the existing image
            $validated['image'] = $testimonial->image;
        }

        // Update the testimonial
        $testimonial->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Testimonial updated successfully!',
            'data' => $testimonial
        ]);
    }

    // Delete testimonial
    public function destroy(Testimonial $testimonial)
    {
        try {
            // Delete old image if exists
            if ($testimonial && $testimonial->image) {
                $oldImagePath = public_path($testimonial->image);
                if (File::exists($oldImagePath)) {
                    File::delete($oldImagePath);
                }
            }

            $testimonial->delete();

            return response()->json([
                'success' => true,
                'message' => 'Testimonial deleted successfully!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete testimonial',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
