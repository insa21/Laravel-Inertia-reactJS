import React, { useEffect } from "react";
import { Link } from "@inertiajs/inertia-react";
import { usePage } from "@inertiajs/inertia-react";
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";

export default function Index({ mahasiswa }) {
    const { flash } = usePage().props;

    const deleteData = (id, nama) => {
        if (confirm(`Yakin menghapus data mahasiswa dengan nama ${nama}?`)) {
            Inertia.delete(`/mahasiswa/${id}`, {
                onSuccess: () => {
                    Swal.fire({
                        title: "Sukses!",
                        text: "Data berhasil dihapus",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                },
            });
        }
    };

    const editData = (id) => {
        Inertia.get(`/mahasiswa/${id}`);
    };

    // Gunakan useEffect untuk menampilkan SweetAlert ketika ada pesan flash
    useEffect(() => {
        if (flash && flash.message) {
            Swal.fire({
                title: "Sukses!",
                text: flash.message,
                icon: "success",
                confirmButtonText: "OK",
            });
        }
    }, [flash]);

    return (
        <div>
            <h3>Data Mahasiswa</h3>
            <hr />
            <Link
                as="button"
                type="button"
                href="/mahasiswa/add"
                style={{ color: "black", marginBottom: 10 }}
            >
                Tambah Data
            </Link>

            <table
                border={1}
                cellPadding={5}
                style={{ borderCollapse: "collapse" }}
            >
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>NIM</th>
                        <th>Nama Lengkap</th>
                        <th>Jenis Kelamin</th>
                        <th>Alamat</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {mahasiswa.length === 0 ? (
                        <tr>
                            <th colSpan={5}>Data Kosong...</th>
                        </tr>
                    ) : (
                        mahasiswa.map((mhs, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{mhs.nim}</td>
                                <td>{mhs.nama_lengkap}</td>
                                <td>
                                    {mhs.jenkel == "L"
                                        ? "Laki-Laki"
                                        : "Perempuan"}
                                </td>
                                <td>{mhs.alamat}</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            editData(mhs.id, mhs.nama_lengkap)
                                        }
                                    >
                                        Edit
                                    </button>
                                    <button
                                        style={{ marginLeft: 5 }}
                                        onClick={() =>
                                            deleteData(mhs.id, mhs.nama_lengkap)
                                        }
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
