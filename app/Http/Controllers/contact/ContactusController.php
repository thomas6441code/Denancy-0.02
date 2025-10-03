<?php

namespace App\Http\Controllers\contact;

use App\Models\Contact;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ContactusController extends Controller
{
    public function index()
    {
        return Inertia::render('web.contactus.Index');
    }

    public function adminIndex()
    {
        return Inertia::render('admin/contacts/ContactsAdmin');
    }

    public function getall(): JsonResponse
    {
        try {
            $messages = Contact::orderBy('created_at', 'desc')->get();
            return response()->json([
                'success' => true,
                'messages' => $messages
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve messages.',
                'error' => $e->getMessage()
            ], 500);
        }
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

    public function markAsRead(Contact $contact)
    {
        $contact->update(['is_read' => true]);
        return response()->json($contact);
    }

    public function markAsUnread(Contact $contact)
    {
        $contact->update(['is_read' => false]);
        return response()->json($contact);
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();
        return response()->json(['message' => 'Message deleted successfully']);
    }
}
