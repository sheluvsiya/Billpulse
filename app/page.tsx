"use client";

import { useMemo, useState } from "react";

type Invoice = { number: string; client: string; date: string; due: string; amount: string; status: "Sent" | "Paid" | "Overdue" };
const initialInvoices: Invoice[] = [
  { number: "INV-0248", client: "Northstar Studio", date: "Jun 14, 2025", due: "Jun 28, 2025", amount: "$2,400.00", status: "Sent" },
  { number: "INV-0247", client: "Olive & Oak Co.", date: "Jun 12, 2025", due: "Jun 26, 2025", amount: "$860.00", status: "Paid" },
  { number: "INV-0246", client: "Morrow Creative", date: "Jun 10, 2025", due: "Jun 24, 2025", amount: "$1,250.00", status: "Overdue" },
  { number: "INV-0245", client: "Fieldwork Goods", date: "Jun 08, 2025", due: "Jun 22, 2025", amount: "$3,180.00", status: "Paid" }
];

export default function Home() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [client, setClient] = useState("");
  const [amount, setAmount] = useState("");
  const [notice, setNotice] = useState("");
  const filtered = useMemo(() => invoices.filter(i => `${i.number} ${i.client} ${i.status}`.toLowerCase().includes(query.toLowerCase())), [invoices, query]);
  const paid = invoices.filter(i => i.status === "Paid").length;

  function createInvoice(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!client.trim() || !Number.isFinite(Number(amount)) || Number(amount) <= 0) return;
    const next = `INV-${String(249 + invoices.length - initialInvoices.length).padStart(4, "0")}`;
    setInvoices([{ number: next, client: client.trim(), date: "Today", due: "Set due date", amount: `$${Number(amount).toFixed(2)}`, status: "Sent" }, ...invoices]);
    setClient(""); setAmount(""); setShowForm(false);
    setNotice("Invoice added to this preview. Connect the API and database before using with real customers.");
    window.setTimeout(() => setNotice(""), 5000);
  }

  return <main className="shell">
    <aside className="sidebar">
      <a className="brand" href="#home"><span className="brand-mark">b.</span><span>billpulse</span></a>
      <div className="workspace-label">WORKSPACE</div>
      <nav aria-label="Main navigation">
        <a className="nav-item active" href="#overview"><span>▦</span> Overview</a>
        <a className="nav-item" href="#invoices"><span>▤</span> Invoices <span className="nav-count">{invoices.length}</span></a>
        <a className="nav-item" href="#clients"><span>♙</span> Clients</a>
        <a className="nav-item" href="#reports"><span>◷</span> Reports</a>
      </nav>
      <div className="sidebar-bottom"><a className="nav-item" href="#settings"><span>⚙</span> Settings</a><div className="profile"><div className="avatar">JD</div><div><strong>Jamie Davis</strong><small>Free plan</small></div><span className="more">···</span></div></div>
    </aside>
    <section className="content" id="overview">
      <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> Overview</div><div className="top-actions"><button className="icon-button" aria-label="Notifications">♧<i /></button><div className="avatar small">JD</div></div></header>
      <div className="page">
        <div className="welcome-row"><div><div className="eyebrow">MONDAY, JUNE 16, 2025</div><h1>Good morning, Jamie <span className="wave">✳</span></h1><p className="subtitle">Here’s what’s happening with your invoices.</p></div><button className="primary-button" onClick={() => setShowForm(true)}><span>＋</span> Create invoice</button></div>
        {notice && <div className="notice" role="status">{notice}</div>}
        <div className="stats-grid">
          <article className="stat-card"><div className="stat-heading">Total outstanding <span className="stat-icon indigo">↗</span></div><strong className="stat-value">$8,240<span>.00</span></strong><div className="stat-foot"><span className="trend">↗ 12.8%</span> <span>vs. last month</span></div><div className="sparkline purple"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></article>
          <article className="stat-card"><div className="stat-heading">Paid this month <span className="stat-icon green">✓</span></div><strong className="stat-value">$12,680<span>.00</span></strong><div className="stat-foot"><span className="trend">↗ 8.2%</span> <span>vs. last month</span></div><div className="sparkline mint"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></article>
          <article className="stat-card"><div className="stat-heading">Invoices sent <span className="stat-icon blue">▤</span></div><strong className="stat-value">{invoices.length + 18}<span> this month</span></strong><div className="stat-foot"><span className="trend">↗ 4.5%</span> <span>vs. last month</span></div><div className="sparkline sky"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></article>
          <article className="stat-card"><div className="stat-heading">Awaiting payment <span className="stat-icon amber">◷</span></div><strong className="stat-value">{invoices.length - paid + 5}<span> invoices</span></strong><div className="stat-foot"><span className="muted">2 overdue</span> <span>need attention</span></div><div className="sparkline gold"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></article>
        </div>
        <div className="section-heading"><div><h2>Recent invoices</h2><p>Keep track of your latest billing activity.</p></div><a className="text-link" href="#invoices">View all invoices <span>→</span></a></div>
        <section className="table-card" id="invoices"><div className="table-toolbar"><div className="tabs"><button className="tab selected">All invoices <span>{invoices.length}</span></button><button className="tab">Drafts</button><button className="tab">Archived</button></div><div className="table-tools"><label className="search"><span>⌕</span><input aria-label="Search invoices" placeholder="Search invoices..." value={query} onChange={e => setQuery(e.target.value)} /></label><button className="filter-button">☷ <span>Filter</span></button></div></div>
          <div className="table-scroll"><table><thead><tr><th><input type="checkbox" aria-label="Select all invoices" /></th><th>INVOICE</th><th>CLIENT</th><th>ISSUE DATE</th><th>DUE DATE</th><th>AMOUNT</th><th>STATUS</th><th /></tr></thead><tbody>{filtered.map(invoice => <tr key={invoice.number}><td><input type="checkbox" aria-label={`Select ${invoice.number}`} /></td><td className="invoice-id">{invoice.number}</td><td><div className="client-cell"><span className={`client-logo logo-${invoice.client.charCodeAt(0) % 4}`}>{invoice.client.charAt(0)}</span>{invoice.client}</div></td><td>{invoice.date}</td><td>{invoice.due}</td><td className="amount">{invoice.amount}</td><td><span className={`status ${invoice.status.toLowerCase()}`}><i />{invoice.status}</span></td><td><button className="row-more" aria-label={`More options for ${invoice.number}`}>···</button></td></tr>)}</tbody></table>{filtered.length === 0 && <div className="empty">No invoices match your search.</div>}</div>
          <div className="table-footer"><span>Showing <strong>{filtered.length ? 1 : 0}–{filtered.length}</strong> of <strong>{filtered.length}</strong> invoices</span><div><button disabled>← Previous</button><button>Next →</button></div></div>
        </section>
        <footer className="footer">© 2025 Billpulse <span>·</span> Made for the way you work <span className="footer-right">Help center　·　Privacy　·　Terms</span></footer>
      </div>
    </section>
    {showForm && <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) setShowForm(false); }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" onClick={() => setShowForm(false)} aria-label="Close">×</button><div className="eyebrow">NEW INVOICE</div><h2 id="modal-title">Create an invoice</h2><p>Start a new invoice for one of your clients.</p><form onSubmit={createInvoice}><label>Client name<input autoFocus required value={client} onChange={e => setClient(e.target.value)} placeholder="e.g. Northstar Studio" /></label><label>Amount (USD)<input required type="number" min="0.01" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" /></label><div className="form-actions"><button type="button" className="secondary-button" onClick={() => setShowForm(false)}>Cancel</button><button className="primary-button" type="submit">Create invoice</button></div></form></section></div>}
  </main>;
}
