import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";

export default function FormEdit({ id, mhs }) {
    const [tnim, setTnim] = useState(mhs.nim);
    const [tnama, setTnama] = useState(mhs.nama_lengkap);
    const [tjenkel, setTjenkel] = useState(mhs.jenkel);
    const [talamat, setTalamat] = useState(mhs.alamat);

    const [loading, setLoading] = useState(false);
    const { errors } = usePage().props; // Menggunakan errors dari props

    const saveData = (e) => {
        e.preventDefault();
        setLoading(true);

        const mahasiswa = { tnama, tjenkel, talamat };
        Inertia.put(`/mahasiswa/${id}`, mahasiswa, {
            onFinish: () => setLoading(false),
        });
    };

    return (
        <>
            <h3>Form Tambah Mahasiswa</h3>
            <hr />

            <Link
                as="button"
                type="button"
                href="/mahasiswa"
                style={{ color: "black", marginBottom: 10 }}
            >
                Kembali
            </Link>

            <form onSubmit={saveData}>
                <table border={0}>
                    <tbody>
                        <tr>
                            <td>Input NIM:</td>
                            <td>
                                <input
                                    maxLength={7}
                                    type="text"
                                    value={tnim}
                                    onChange={(e) => setTnim(e.target.value)}
                                    placeholder="Masukkan NIM"
                                    disabled={true}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Input Nama:</td>
                            <td>
                                <input
                                    type="text"
                                    value={tnama}
                                    onChange={(e) => setTnama(e.target.value)}
                                    placeholder="Masukkan Nama"
                                />
                                {errors.tnama && (
                                    <div
                                        style={{
                                            color: "red",
                                            fontStyle: "italic",
                                        }}
                                    >
                                        {errors.tnama}
                                    </div>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>Jenis Kelamin:</td>
                            <td>
                                <select
                                    value={tjenkel}
                                    onChange={(e) => setTjenkel(e.target.value)}
                                >
                                    <option
                                        value="L"
                                        selected={tjenkel == "L" && true}
                                    >
                                        Laki-laki
                                    </option>
                                    <option
                                        value="P"
                                        selected={tjenkel == "P" && true}
                                    >
                                        Perempuan
                                    </option>
                                </select>
                                {errors.tjenkel && (
                                    <div
                                        style={{
                                            color: "red",
                                            fontStyle: "italic",
                                        }}
                                    >
                                        {errors.tjenkel}
                                    </div>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>Input Alamat:</td>
                            <td>
                                <textarea
                                    value={talamat}
                                    onChange={(e) => setTalamat(e.target.value)}
                                    placeholder="Masukkan Alamat"
                                    cols={30}
                                    rows={5}
                                />
                                {errors.talamat && (
                                    <div
                                        style={{
                                            color: "red",
                                            fontStyle: "italic",
                                        }}
                                    >
                                        {errors.talamat}
                                    </div>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button type="submit" disabled={loading}>
                                    {loading ? "Tunggu" : "Edit Data"}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </>
    );
}
