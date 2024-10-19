<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use Illuminate\Contracts\Support\ValidatedData;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MahasiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $mahasiswa = Mahasiswa::all();
        return Inertia::render('Mahasiswa/Index', ['mahasiswa' => $mahasiswa]);
    }

    public function formAdd()
    {
        return Inertia::render('Mahasiswa/FormTambah');
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi data
        $validateData = $request->validate([
            'tnim' => 'required|unique:mahasiswa,nim|max:7',  // Validasi untuk NIM
            'tnama' => 'required',                             // Validasi untuk Nama
            'tjenkel' => 'required',                           // Validasi untuk Jenis Kelamin
            'talamat' => 'required'                            // Validasi untuk Alamat
        ], [
            'tnim.required' => 'NIM harus diisi.', // Pesan kustom untuk NIM
            'tnim.unique' => 'NIM sudah terdaftar.', // Pesan kustom untuk NIM unik
            'tnim.max' => 'NIM tidak boleh lebih dari 7 karakter.', // Pesan kustom untuk max
            'tnama.required' => 'Nama harus diisi.', // Pesan kustom untuk Nama
            'tjenkel.required' => 'Jenis Kelamin harus diisi.', // Pesan kustom untuk Jenis Kelamin
            'talamat.required' => 'Alamat harus diisi.' // Pesan kustom untuk Alamat
        ], [
            'tnim' => 'NIM',        // Alias untuk pesan validasi NIM
            'tnama' => 'Nama',      // Alias untuk pesan validasi Nama
            'tjenkel' => 'Jenis Kelamin', // Alias untuk pesan validasi Jenis Kelamin
            'talamat' => 'Alamat'   // Alias untuk pesan validasi Alamat
        ]);

        $mahasiswa = new Mahasiswa();
        $mahasiswa->nim = $validateData['tnim'];
        $mahasiswa->nama_lengkap = $validateData['tnama'];
        $mahasiswa->jenkel = $validateData['tjenkel'];
        $mahasiswa->alamat = $validateData['talamat'];
        $mahasiswa->save();

        return redirect()->route('mahasiswa.index')->with('message', 'Data Mahasiswa Baru Berhasil Disimpan');
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $mahasiswa = Mahasiswa::find($id);
        if ($mahasiswa) {
            return Inertia::render('mahasiswa/FormEdit', [
                'id' => $id,
                'mhs' => $mahasiswa,
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validateData = $request->validate([
            // 'tnim' => 'required|unique:mahasiswa,nim|max:7',  // Validasi untuk NIM
            'tnama' => 'required',                             // Validasi untuk Nama
            'tjenkel' => 'required',                           // Validasi untuk Jenis Kelamin
            'talamat' => 'required'                            // Validasi untuk Alamat
        ], [
            // 'tnim.required' => 'NIM harus diisi.', // Pesan kustom untuk NIM
            'tnim.unique' => 'NIM sudah terdaftar.', // Pesan kustom untuk NIM unik
            'tnim.max' => 'NIM tidak boleh lebih dari 7 karakter.', // Pesan kustom untuk max
            'tnama.required' => 'Nama harus diisi.', // Pesan kustom untuk Nama
            'tjenkel.required' => 'Jenis Kelamin harus diisi.', // Pesan kustom untuk Jenis Kelamin
            'talamat.required' => 'Alamat harus diisi.' // Pesan kustom untuk Alamat
        ], [
            // 'tnim' => 'NIM',        // Alias untuk pesan validasi NIM
            'tnama' => 'Nama',      // Alias untuk pesan validasi Nama
            'tjenkel' => 'Jenis Kelamin', // Alias untuk pesan validasi Jenis Kelamin
            'talamat' => 'Alamat'   // Alias untuk pesan validasi Alamat
        ]);

        $mahasiswa = Mahasiswa::find($id);
        // $mahasiswa->nim = $validateData['tnim'];
        $mahasiswa->nama_lengkap = $validateData['tnama'];
        $mahasiswa->jenkel = $validateData['tjenkel'];
        $mahasiswa->alamat = $validateData['talamat'];
        $mahasiswa->save();

        return redirect()->route('mahasiswa.index')->with('message', 'Data Mahasiswa dengan NIM: ' . $mahasiswa->nim . ' Berhasil Diupdate...');
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $mahasiswa = Mahasiswa::findOrFail($id);
        $nim = $mahasiswa->nim;
        $mahasiswa->delete();

        return redirect()->route('mahasiswa.index')
            ->with('message', 'Data Mahasiswa dengan NIM ' . $nim . ' Berhasil terhapus');
    }
}
