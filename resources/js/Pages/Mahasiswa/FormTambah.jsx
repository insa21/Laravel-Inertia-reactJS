import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";

export default function FormTambah() {
    const [tnim, setTnim] = useState("");
    const [tnama, setTnama] = useState("");
    const [tjenkel, setTjenkel] = useState("");
    const [talamat, setTalamat] = useState("");

    const [loading, setLoading] = useState(false);
    const { errors } = usePage().props; // Menggunakan errors dari props

    const saveData = (e) => {
        e.preventDefault();
        setLoading(true);

        const mahasiswa = { tnim, tnama, tjenkel, talamat };
        Inertia.post("/mahasiswa", mahasiswa, {
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
                                />
                                {errors.tnim && (
                                    <div
                                        style={{
                                            color: "red",
                                            fontStyle: "italic",
                                        }}
                                    >
                                        {errors.tnim}
                                    </div>
                                )}
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
                                    <option value="">
                                        Pilih Jenis Kelamin
                                    </option>
                                    <option value="L">Laki-laki</option>
                                    <option value="P">Perempuan</option>
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
                                    {loading ? "Tunggu" : "Simpan Data"}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </>
    );
}
