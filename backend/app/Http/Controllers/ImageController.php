<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:2048', // 2MB max
        ]);

        // Upload to S3 inside 'products/' folder
        $path = $request->file('image')->store('products', 's3');

        // Make it public
        Storage::disk('s3')->setVisibility($path, 'public');

        // Get full public URL
        $url = Storage::disk('s3')->url($path);

        return response()->json([
            'success' => true,
            'url' => $url,
        ]);
    }
}
