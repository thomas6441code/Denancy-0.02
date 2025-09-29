<?php

namespace App\Http\Controllers\contact;

use App\Models\Contact;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class ContactusController extends Controller
{
    public function index()
    {
        return view('web.contactus.Index');
    }

    public function submit(Request $request)
    {
         try {
            $validated = $request->validate([
                'name' => 'required|string|max:100',
                'email' => 'required|email',
                'phone' => 'required|string|max:20',
                'subject' => 'required|string|max:100',
                'message' => 'required|string|max:1000|min:15',
            ]);

            $message = Contact::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Thank you for your message! We will get back to you soon.',
                'data' => $message
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
                'message' => 'An error occurred while submitting your message.'
            ], 500);
        }
    }
}
