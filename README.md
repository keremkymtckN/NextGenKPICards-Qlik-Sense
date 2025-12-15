Executive Dashboard UI Kit

Qlik Sense Extension – Embedded Dashboard Framework

📌 Overview

This project is a custom Qlik Sense Extension that provides a full executive dashboard container including:

KPI cards (3×4 grid – 12 KPIs)

Line / Bar / Pie chart containers

Detail table container

Dark / Light mode support

Corporate-ready color system

Native Qlik object embedding via Object IDs

The extension is designed as a UI Kit & Dashboard Framework, not a single visualization.

🎯 Purpose

The main objectives of this project are:

Separate data logic (Qlik native objects) from presentation (custom UI)

Enable enterprise-grade dashboard composition

Provide a reusable and scalable dashboard architecture

Allow teams to design one-page executive dashboards with consistent UX

🧱 Architecture
1. Native Qlik Objects (Engine Layer)

All KPIs, charts and tables are created as native Qlik Sense objects and stored in a hidden engine sheet.

Recommended sheet name:

_EngineObjects


Sheet visibility condition:

0


This ensures:

Objects remain active in the Qlik Engine

Users never see raw engine objects

UI and data layers stay fully decoupled

2. Dashboard Container (UI Layer)

The extension renders a single dashboard layout and embeds native objects dynamically using:

app.getObject(containerId, objectId);


The dashboard layout includes:

12 KPI slots (3×4 grid)

Trend (Line chart) section

Distribution (Bar chart) section

Ratio / Share (Pie or Donut) section

Detail table section

Global header and spacing system

🧩 What This Extension Is (and Is Not)
✅ This Extension IS:

A dashboard framework

A UI composition layer

A container for native Qlik objects

Suitable for enterprise and regulated environments

❌ This Extension is NOT:

A replacement for Qlik native visualizations

A data modeling or ETL tool

A single KPI visualization

⚠️ Important Qlik Behavior

If a native Qlik object is deleted, it disappears everywhere it is used.

This is expected Qlik behavior.

Best practice:

Do not delete native objects

Keep them inside _EngineObjects

Control visibility only via the dashboard container

🌓 Theme Support

The extension supports:

Dark mode

Light mode

Theme selection is managed through extension properties and applied globally to the dashboard.

🎨 Design System

Executive-grade UI

Consistent spacing and typography

KPI-focused layout

Neutral corporate color palette (customizable)

High readability for management use

🛠 Installation & Usage

Clone or download this repository

Copy the extension folder into:

QlikSense/extensions/


Reload Qlik Sense

Create a hidden sheet:

_EngineObjects


Create native KPIs, charts and tables

Copy each object’s Object ID

Paste Object IDs into the extension’s properties panel

Use the dashboard container as the primary visible dashboard

📈 Typical Use Cases

Executive dashboards

Management reporting

Sales & performance overviews

Financial summaries

Operational monitoring dashboards

🚀 Possible Extensions

KPI threshold coloring

Drill-down support

Parameter-driven layouts

Snapshot / export features

Role-based visibility logic

🏢 Enterprise Readiness

This architecture follows patterns commonly used in:

Large-scale BI platforms

Regulated industries

Enterprise Qlik mashups

Long-term production dashboards

📄 License

Internal or commercial usage allowed.
Adapt and extend according to organizational standards.
