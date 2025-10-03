<?php

namespace App\Http\Controllers;

use App\Models\Slide;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SlideController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        try {
            $slides = Slide::all();

            return Inertia::render('admin/slides/SlidesAdmin', [
                'slide' => $slides,
            ]);
        } catch (\Exception $e) {
            return Inertia::render('admin/slides/SlidesAdmin', [
                'slides' => [],
                'error' => 'Failed to load slides: ' . $e->getMessage(),
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'url' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Handle file upload
            if ($request->hasFile('url')) {
                $file = $request->file('url');
                $fileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('images/slides'), $fileName);
                $imageUrl = '/images/slides/' . $fileName;
            }

            $slide = Slide::create([
                'url' => $imageUrl,
                'title' => $request->title,
                'description' => $request->description,
            ]);

            return response()->json([
                'success' => true,
                'data' => $slide,
                'message' => 'Slide created successfully.'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create slide.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Slide $slide): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'url' => 'sometimes|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {

            $updateData = $request->only(['title', 'description']);

            // Handle file upload if new image is provided
            if ($request->hasFile('url')) {
                // Delete old image if exists
                if ($slide->url) {
                    $oldImagePath = str_replace('/public/', '', $slide->url);
                    if (Storage::disk('public')->exists($oldImagePath)) {
                        Storage::disk('public')->delete($oldImagePath);
                    }
                }

                // Upload new image
                $file = $request->file('url');
                $fileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                $filePath = $file->storeAs('images/slides', $fileName, 'public');

                $updateData['url'] = $filePath;
            }

            $slide->update($updateData);

            return response()->json([
                'success' => true,
                'data' => $slide,
                'message' => 'Slide updated successfully.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update slide.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Slide $slide): JsonResponse
    {
        try {

            if (!$slide) {
                return response()->json([
                    'success' => false,
                    'message' => 'Slide not found.'
                ], 404);
            }

            // Delete associated image file
            if ($slide->url) {
                $imagePath = str_replace('/public/', '', $slide->url);
                if (Storage::disk('public')->exists($imagePath)) {
                    Storage::disk('public')->delete($imagePath);
                }
            }

            $slide->delete();

            return response()->json([
                'success' => true,
                'message' => 'Slide deleted successfully.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete slide.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
