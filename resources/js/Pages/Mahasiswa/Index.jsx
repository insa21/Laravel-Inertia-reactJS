import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import { usePage } from "@inertiajs/inertia-react";
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Index({ mahasiswa, filters }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || "");

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

    const doSearchData = (e) => {
        e.preventDefault();
        Inertia.get("/mahasiswa", { search }, { preserveState: true });
    };

    const startNumber = (mahasiswa.current_page - 1) * mahasiswa.per_page;

    return (
        <div className="container container-fluid">
            <h3>Data Mahasiswa</h3>
            <hr />
            <Link
                as="button"
                type="button"
                href="/mahasiswa/add"
                className="btn btn-sm btn-primary"
                style={{ marginBottom: 10 }}
            >
                Tambah Data
            </Link>

            <form action="" onSubmit={doSearchData}>
                <>
                    <div class="input-group mb-3">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Cari data Mahasiswa"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button class="btn btn-outline-success" type="submit">
                            Cari
                        </button>
                    </div>
                </>
            </form>
            <table className="table table-bordered table-striped table-sm">
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
                    {mahasiswa.data && mahasiswa.data.length === 0 ? (
                        <tr>
                            <th colSpan={6}>Data Kosong...</th>
                        </tr>
                    ) : (
                        mahasiswa.data.map((mhs, index) => (
                            <tr key={index}>
                                <td>{startNumber + index + 1}</td>
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
                                        className="btn btn-sm btn-info"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        style={{ marginLeft: 5 }}
                                        onClick={() =>
                                            deleteData(mhs.id, mhs.nama_lengkap)
                                        }
                                        className="btn btn-sm btn-danger"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div style={{ marginTop: 10 }}>
                <ul class="pagination">
                    {mahasiswa.links.map((link, index) => {
                        if (link.url === null) {
                            return null;
                        }

                        let isActive = link.active;
                        let className = isActive
                            ? "page-item active"
                            : "page-item";
                        let linkLabel = link.label
                            .replace(/&laquo;/, "<<")
                            .replace(/&raquo;/, ">>");

                        return (
                            <li className={className} key={index}>
                                <button
                                    className="page-link"
                                    onClick={() => Inertia.get(link.url)}
                                >
                                    {linkLabel}
                                </button>
                            </li>
                        );
                    })}
                </ul>

                {/* {mahasiswa.links.map((link, index) => {
                    let isActive = link.active;
                    const linkActive = isActive
                        ? { fontWeight: "bold", TextDecoration: "underline" }
                        : {};

                    let linkLabel = link.label;

                    if (linkLabel.includes("raquo")) {
                        linkLabel = "Next >>";
                    }
                    if (linkLabel.includes("laquo")) {
                        linkLabel = "<< Previous";
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => Inertia.get(link.url)}
                            disabled={isActive}
                            style={linkActive}
                        >
                            {linkLabel}
                        </button>
                    );
                })} */}
            </div>
        </div>
    );
}
