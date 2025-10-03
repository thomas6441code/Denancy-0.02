<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Stat;
use Illuminate\Http\Request;

class StatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/stats/StatsAdmin', [
            'stats' => Stat::latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/stats/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'icon' => 'required|string|max:255',
            'label' => 'required|string|max:255',
            'value' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);


        try {

            $stat = Stat::create($validated);

            return redirect()->route('admin.stats.StatsAdmin')->with('success', 'Stat submited successfully!');
        } catch (\Exception $e) {

            return redirect()->route('admin.stats.StatsAdmin')->with('success', 'Stat creation failed!');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Stat $stat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Stat $stat)
    {
        return Inertia::render('admin/stats/Edit', [
            'stat' => $stat
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Stat $stat)
    {

        $validated = $request->validate([
            'icon' => 'required|string|max:255',
            'label' => 'required|string|max:255',
            'value' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);

        $stat->update($validated);

        return redirect()->route('admin.stats.StatsAdmin')->with('success', 'Stat updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stat $stat)
    {
        $stat->delete();
        return redirect()->route('admin.stats.StatsAdmin')->with('success', 'Stat deleted successfully!');
    }
}
