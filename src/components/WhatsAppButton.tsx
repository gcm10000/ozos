// src/components/WhatsAppButton.tsx
'use client'
import Link from 'next/link'

export default function WhatsAppButton() {
  return (
    <Link
      href="https://wa.me/5521998253007?text=Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20seus%20servi%C3%A7os."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        className="w-14 h-14 hover:scale-110 transition-transform"
      />
    </Link>
  )
}