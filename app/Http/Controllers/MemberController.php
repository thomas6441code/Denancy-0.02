<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Member;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class MemberController extends Controller
{
      
        public function index()
        {
            return Inertia::render('admin/teams/TeamsAdmin');
        }
    
        public function indexteams()
        {
            $member = Member::all();
            return response()->json($member, 201);
        }
    
        public function store(Request $request)
        {
           
            try {
                $request->validate([
                    'name' => 'required|string|max:255',
                    'role' => 'required|string|max:255',
                    'bio' => 'required|string|max:255',
                    'image_url' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048'
                ]);
        
                $image = $request->file('image_url');
                $extension = $image->getClientOriginalExtension();
                $filename = time().'_'.Str::slug(pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME)).'.'.$extension;
                
                $image->move(public_path('images/member'), $filename);

        
                $member = Member::create([
                    'name' => $request->name,
                    'role' => $request->role,
                    'bio' => $request->bio,
                    'image_url' => '/images/member/' . $filename,
                ]);
        
                return response()->json([
                    'success' => true,
                    'message' => 'Member Created Succefuly.',
                ]);
    
            } catch (ValidationException $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $e->errors()
                ], 422);
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'An error occurred while creating your member request.',
                    'error_details' => config('app.debug') ? $e->getMessage() : null
                ], 500);
            }
    
    
        }
    
        public function update(Request $request, Member $member)
        {
            try {
                $request->validate([
                    'name' => 'string|max:255',
                    'role' => 'string|max:255',
                    'bio' => 'string|max:255',
                    'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048'
                ]);
        
                if ($request->hasFile('image_url')) {
                    // Delete old image
                    $oldimage = $member->image_url;
                    if (file_exists($oldimage)) {
                        unlink($oldimage);
                    }
        
                    // Store new image
                    $image = $request->file('image_url');
                    $extension = $image->getClientOriginalExtension();
                    $filename = time().'_'.Str::slug(pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME)).'.'.$extension;
                    
                    $image->move(public_path('images/member'), $filename);
                    $member->image_url = '/images/member/' . $filename;
                }
        
                $member->name = $request->name ?? $member->name;
                $member->role = $request->role ?? $member->role;
                $member->bio = $request->bio ?? $member->bio;
                $member->save();
        
                return response()->json([
                    'success' => true,
                    'message' => 'Member updated Succefuly.',
                ]);
            } catch (ValidationException $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $e->errors()
                ], 422);
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'An error occurred while updating your member request.',
                    'error_details' => config('app.debug') ? $e->getMessage() : null
                ], 500);
            }
        }
    
        public function destroy(Member $member)
        {
           
            try {
    
                 // Delete old image
                 $oldimage = $member->image_url;
                 if (file_exists($oldimage)) {
                    unlink($oldimage);
                 }
    
                $member->delete();
        
                return response()->json([
                    'success' => true,
                    'message' => 'Member deleted Succefuly.',
                ]);
          
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'An error occurred while deleting your member request.',
                    'error_details' => config('app.debug') ? $e->getMessage() : null
                ], 500);
            }
        }
    }
    
