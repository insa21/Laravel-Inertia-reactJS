import React from "react";

export default function Index({ mahasiswa }) {
    // console.log(mahasiswa);
    return (
        <div>
            <h3>Data Mahasiswa</h3>
            <hr />

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
