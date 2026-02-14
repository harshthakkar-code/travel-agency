import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import { supabase } from "./supabaseClient";
import { jsPDF } from "jspdf";

const Confirmation = () => {
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const sessionId = params.get("session_id");

  const generateInvoicePDF = (transaction) => {
    const doc = new jsPDF("p", "pt", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const leftMargin = 40;
    const rightMargin = pageWidth - 40;
    let y = 40;

    const formatMoney = (cents) =>
      `$${(cents).toLocaleString(undefined, {
        minimumFractionDigits: 2,
      })}`;

    const formatPercent = (cents) =>
      `$${(cents / 100).toLocaleString(undefined, {
        minimumFractionDigits: 2,
      })}`;

    // Parse values safely
    const pkgCostCents = Number(transaction.pricing.packageCost) || 0;
    const taxPercent = parseFloat(
      (transaction.pricing.taxRate || "0").replace("%", "")
    );
    const taxCents = Math.round(pkgCostCents * (taxPercent / 100));
    const subtotalCents = pkgCostCents;
    const totalCents = subtotalCents + taxCents;

    // ----- Header -----
    doc.setFillColor("#004481");
    doc.rect(0, 0, pageWidth, 75, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor("#fff");
    doc.text("Invoice", leftMargin, 48);

    // Invoice meta data on right
    doc.setFontSize(10);
    doc.setTextColor("#fff");
    doc.text(`Invoice Date: ${new Date(transaction.createdAt).toLocaleDateString()}`, rightMargin - 160, 30);
    doc.text(`Invoice ID: ${transaction._id}`, rightMargin - 160, 44);
    doc.text(`Status: ${transaction.status.toUpperCase()}`, rightMargin - 160, 59);

    y = 100;

    // ----- Company Info (left) -----
    doc.setFontSize(12);
    doc.setTextColor("#000");
    doc.text("Your Company Name", leftMargin, y);
    doc.setFontSize(10);
    doc.text("123 Business Ave", leftMargin, y + 15);
    doc.text("City, State, ZIP", leftMargin, y + 30);
    doc.text("Phone: +1 555-123-4567", leftMargin, y + 45);
    doc.text("Email: support@yourcompany.com", leftMargin, y + 60);

    // ----- Customer Info (right) -----
    const cx = rightMargin - 220;
    doc.setFontSize(12);
    doc.text("Bill To:", cx, y);
    doc.setFontSize(10);
    const { billingAddress = {}, user = {} } = transaction;
    doc.text(`${user.fullName}`, cx, y + 15);
    doc.text(`${billingAddress.street1} ${billingAddress.street2}`, cx, y + 30);
    doc.text(`${billingAddress.city}, ${billingAddress.state}`, cx, y + 45);
    doc.text(`${billingAddress.country} - ${billingAddress.postalCode}`, cx, y + 60);
    doc.text(`Phone: ${user.phone}`, cx, y + 75);
    doc.text(`Email: ${user.email}`, cx, y + 90);

    y = 210;

    // Line below header
    doc.setDrawColor("#bbbbbb");
    doc.setLineWidth(0.8);
    doc.line(leftMargin, y, rightMargin, y);

    y += 30;

    // ===== Fees & Payment Table =====
    doc.setFontSize(16);
    doc.setTextColor("#004481");
    doc.setFont("helvetica", "bold");
    doc.text("Fees & Payment Details", leftMargin, y);
    y += 20;

    // Table header
    doc.setFillColor("#004481");
    doc.setTextColor("#fff");
    doc.setFontSize(12);
    const colX = [leftMargin, leftMargin + 220, leftMargin + 310, leftMargin + 410];
    const headerHeight = 24;
    doc.rect(leftMargin - 5, y - 17, rightMargin - leftMargin + 10, headerHeight, "F");

    ["Description", "Qty", "Unit Price", "Amount"].forEach((text, i) => {
      let align = "left";
      if (text === "Qty") align = "center";
      if (text === "Unit Price" || text === "Amount") align = "right";
      doc.text(text, colX[i] + (align === "left" ? 5 : 0), y, { align });
    });

    y += 10;
    doc.setDrawColor("#bbbbbb");
    doc.setLineWidth(0.5);
    doc.line(leftMargin - 5, y, rightMargin + 5, y);

    y += 20;

    // Table rows - Package
    doc.setFontSize(11);
    doc.setTextColor("#000");
    doc.setFont("helvetica", "normal");

    const pkg = transaction.package;
    doc.text(`${pkg.packageTitle} (${pkg.destination} - ${pkg.tripDuration})`, colX[0] + 5, y);
    doc.text("-", colX[1], y, { align: "center" }); // no qty for group size
    doc.text(formatMoney(pkg.packagePrice), colX[2], y, { align: "right" });
    doc.text(formatMoney(subtotalCents), colX[3], y, { align: "right" });
    y += 20;

    // Add-ons rows if any
    const addons = transaction.addOns || {};
    const addonPrices = {
      tourGuide: transaction.pricing.tourGuide * 100 || 0,
      mealsIncluded: transaction.pricing.mealsIncluded * 100 || 0,
      extraBaggage: transaction.pricing.extraBaggage * 100 || 0,
      transfers: transaction.pricing.transfers * 100 || 0,
    };
    const addonLabels = {
      tourGuide: "Tour Guide",
      mealsIncluded: "Meals Included",
      extraBaggage: "Extra Baggage",
      transfers: "Transfers",
    };

    Object.keys(addons).forEach((key) => {
      if (addons[key]) {
        doc.text(addonLabels[key], colX[0] + 5, y);
        doc.text("-", colX[1], y, { align: "center" });
        doc.text(formatMoney(addonPrices[key]), colX[2], y, { align: "right" });
        doc.text(formatMoney(addonPrices[key]), colX[3], y, { align: "right" });
        y += 20;
      }
    });

    // Summary rows
    y += 10;
    doc.setDrawColor("#bbbbbb");
    doc.setLineWidth(0.5);
    doc.line(leftMargin - 5, y, rightMargin + 5, y);

    y += 15;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Subtotal:", colX[2], y, { align: "right" });
    doc.text(formatMoney(subtotalCents), colX[3], y, { align: "right" });
    y += 20;

    doc.text(`Tax (${transaction.pricing.taxRate || "0%"}):`, colX[2], y, { align: "right" });
    doc.text(formatMoney(subtotalCents * (parseFloat((transaction.pricing.taxRate || "0").replace("%", "")) / 100)), colX[3], y, { align: "right" });
    y += 25;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Total:", colX[2], y, { align: "right" });
    doc.text(formatPercent(transaction.amount), colX[3], y, { align: "right" });
    y += 40;

    // Footer
    doc.setDrawColor("#cccccc");
    doc.setLineWidth(0.8);
    doc.line(leftMargin, y, rightMargin, y);

    y += 20;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#888888");
    doc.text("Thank you for your business!", leftMargin, y);
    doc.text("If you have any questions, contact support@yourcompany.com", leftMargin, y + 15);
    doc.text("Powered by YourCompany", rightMargin - 140, y);

    // Open PDF in new tab
    doc.output("dataurlnewwindow");
  };

  useEffect(() => {
    const fetchBookingDetails = async () => {
      const query = new URLSearchParams(window.location.search);
      const bookingId = query.get("booking_id");

      if (bookingId) {
        try {
          const { data, error } = await supabase
            .from('bookings')
            .select(`
              *,
              packages:package_id(title, destination)
            `)
            .eq('id', bookingId)
            .single();

          if (error) throw error;

          if (data) {
            setTransaction(data);
            setLoading(false);
          }
        } catch (err) {
          console.error("Error fetching booking:", err);
          setError('Could not verify booking.');
          setLoading(false);
        }
      } else {
        setError('No booking ID found.');
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, []);

  if (loading) {
    return <p>Loading confirmation details...</p>;
  }

  if (error) {
    return (
      <div className="container" style={{ marginTop: '100px', textAlign: 'center' }}>
        <h3>{error}</h3>
        <p>Please contact support if you believe this is an error.</p>
      </div>
    );
  }

  // Derived state from transaction (which is now the supabase booking object)
  const booking = transaction || {};
  const pkg = booking.packages || {};

  return (
    <>
      <div id="page" className="full-page">
        <Header />

        <main id="content" className="site-main">
          <section
            className="inner-banner-wrap"
            style={{
              backgroundImage: "url(/assets/images/inner-banner.jpg)",
            }}
          >
            <div className="container">
              <div className="inner-banner-content">
                <h1 className="inner-title">Booking Confirmation</h1>
              </div>
            </div>
            <div className="inner-shape"></div>
          </section>

          <div className="step-section cart-section">
            <div className="container">
              <div className="confirmation-outer">
                <div className="success-notify">
                  <div className="success-icon">
                    <i className="fas fa-check" />
                  </div>
                  <div className="success-content">
                    <h3>BOOKING RECEIVED</h3>
                    <p>
                      Thank you, your booking status is <strong>{booking.status?.toUpperCase()}</strong>.
                      We will contact you shortly.
                    </p>

                  </div>
                </div>

                <div className="confirmation-inner">
                  <div className="row">
                    <div className="col-lg-8 right-sidebar">
                      <div className="confirmation-details">
                        <h3>BOOKING DETAILS</h3>
                        <table className="table">
                          <tbody>
                            <tr>
                              <td>Booking ID:</td>
                              <td>{booking.id}</td>
                            </tr>
                            <tr>
                              <td>Date:</td>
                              <td>{new Date(booking.booking_date).toLocaleDateString()}</td>
                            </tr>
                            <tr>
                              <td>Status:</td>
                              <td>{booking.status}</td>
                            </tr>
                          </tbody>
                        </table>

                        <div className="details">
                          <h3>PACKAGE DETAILS</h3>
                          <div className="details-desc">
                            <p><strong>Package:</strong> {pkg.title}</p>
                            <p><strong>Destination:</strong> {pkg.destination}</p>
                          </div>
                        </div>

                      </div>
                    </div>

                    <div className="col-lg-4">
                      <aside className="sidebar">
                        <div className="widget-bg widget-support-wrap">
                          <div className="icon">
                            <i className="fas fa-phone-volume" />
                          </div>
                          <div className="support-content">
                            <h3>HELP AND SUPPORT</h3>
                            <p>
                              Phone: +11 234 889 00 <br />
                              Monday to Friday 9.00am - 7.30pm
                            </p>
                          </div>
                        </div>
                      </aside>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Confirmation;
