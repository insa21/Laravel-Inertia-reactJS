import React, { useEffect } from "react";
import { Link } from "@inertiajs/inertia-react";
import { usePage } from "@inertiajs/inertia-react";
import Swal from "sweetalert2";

export default function Index({ mahasiswa }) {
    const { flash } = usePage().props;

    // Gunakan useEffect untuk menampilkan SweetAlert ketika ada pesan flash
    useEffect(() => {
        if (flash && flash.message) {
            Swal.fire({
                title: "Sukses!",
                text: "Data berhasil ditambahkan",
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
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
