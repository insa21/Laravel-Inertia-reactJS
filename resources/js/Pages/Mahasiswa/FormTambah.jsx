import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import "bootstrap/dist/css/bootstrap.min.css";

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
        <div className="container mt-4">
            <h3 className="text-center mb-4">Form Tambah Mahasiswa</h3>
            <hr />

            <Link
                as="button"
                type="button"
                href="/mahasiswa"
                className="btn btn-secondary mb-3"
            >
                Kembali
            </Link>

            <form onSubmit={saveData} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label htmlFor="tnim" className="form-label">
                        Input NIM:
                    </label>
                    <input
                        id="tnim"
                        maxLength={7}
                        type="text"
                        className={`form-control ${
                            errors.tnim ? "is-invalid" : ""
                        }`}
                        value={tnim}
                        onChange={(e) => setTnim(e.target.value)}
                        placeholder="Masukkan NIM"
                    />
                    {errors.tnim && (
                        <div className="invalid-feedback">{errors.tnim}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="tnama" className="form-label">
                        Input Nama:
                    </label>
                    <input
                        id="tnama"
                        type="text"
                        className={`form-control ${
                            errors.tnama ? "is-invalid" : ""
                        }`}
                        value={tnama}
                        onChange={(e) => setTnama(e.target.value)}
                        placeholder="Masukkan Nama"
                    />
                    {errors.tnama && (
                        <div className="invalid-feedback">{errors.tnama}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="tjenkel" className="form-label">
                        Jenis Kelamin:
                    </label>
                    <select
                        id="tjenkel"
                        className={`form-select ${
                            errors.tjenkel ? "is-invalid" : ""
                        }`}
                        value={tjenkel}
                        onChange={(e) => setTjenkel(e.target.value)}
                    >
                        <option value="">Pilih Jenis Kelamin</option>
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                    </select>
                    {errors.tjenkel && (
                        <div className="invalid-feedback">{errors.tjenkel}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="talamat" className="form-label">
                        Input Alamat:
                    </label>
                    <textarea
                        id="talamat"
                        className={`form-control ${
                            errors.talamat ? "is-invalid" : ""
                        }`}
                        value={talamat}
                        onChange={(e) => setTalamat(e.target.value)}
                        placeholder="Masukkan Alamat"
                        rows={5}
                    />
                    {errors.talamat && (
                        <div className="invalid-feedback">{errors.talamat}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? "Tunggu" : "Simpan Data"}
                </button>
            </form>
        </div>
    );
}
