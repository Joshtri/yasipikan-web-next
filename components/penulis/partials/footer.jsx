"use client";

import { Footer } from 'flowbite-react';

export default function FooterPenulis() {
    const currentYear = new Date().getFullYear();

    return (
        <Footer container className="border-t bg-white">
            <Footer.Copyright
                by="Yayasan Sirih Pinang Kebaikan™"
                href="#"
                year={currentYear}
            />
            <Footer.LinkGroup>
                <Footer.Link href="#">
                    Tentang Kami
                </Footer.Link>
                <Footer.Link href="#">
                    Kebijakan Privasi
                </Footer.Link>
                <Footer.Link href="#">
                    Licensing
                </Footer.Link>
                <Footer.Link href="#">
                    Kontak
                </Footer.Link>
            </Footer.LinkGroup>
        </Footer>
    );
}