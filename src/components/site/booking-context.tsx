"use client";

import * as React from "react";

export type BookingKind = "new" | "followup" | "online" | "enquiry" | null;

interface BookingContextValue {
  bookingKind: BookingKind;
  openBooking: (kind: Exclude<BookingKind, null>) => void;
  closeBooking: () => void;
  whatsappOpen: boolean;
  openWhatsApp: () => void;
  closeWhatsApp: () => void;
}

const BookingContext = React.createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = React.useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return ctx;
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookingKind, setBookingKind] = React.useState<BookingKind>(null);
  const [whatsappOpen, setWhatsappOpen] = React.useState(false);

  const openBooking = React.useCallback((kind: Exclude<BookingKind, null>) => {
    setBookingKind(kind);
  }, []);
  const closeBooking = React.useCallback(() => setBookingKind(null), []);
  const openWhatsApp = React.useCallback(() => setWhatsappOpen(true), []);
  const closeWhatsApp = React.useCallback(() => setWhatsappOpen(false), []);

  const value = React.useMemo(
    () => ({
      bookingKind,
      openBooking,
      closeBooking,
      whatsappOpen,
      openWhatsApp,
      closeWhatsApp,
    }),
    [bookingKind, whatsappOpen, openBooking, closeBooking, openWhatsApp, closeWhatsApp]
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}
