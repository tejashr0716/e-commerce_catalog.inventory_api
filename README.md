# 🛒 E-Commerce Catalog & Inventory API

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0.3-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A dynamic, high-performance **E-Commerce Catalog and Inventory Management REST API** built with **Python (Flask)**, **MySQL**, and **vanilla JavaScript**. 

Engineered to showcase dynamic parameterized SQL construction, database indexing strategies, SQL query performance optimization with `EXPLAIN`, and asynchronous DOM updates via the JavaScript Fetch API.

---

## 📌 Table of Contents
- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Database Schema & Design](#-database-schema--design)
- [Dynamic SQL Query Construction](#-dynamic-sql-query-construction)
- [SQL Optimization & Indexing Strategy](#-sql-optimization--indexing-strategy)
- [REST API Endpoints](#-rest-api-endpoints)
- [Getting Started & Local Setup](#-getting-started--local-setup)
- [Running Automated Tests](#-running-automated-tests)
- [Author](#-author)

---

## 📖 Project Overview

Handling multi-attribute search and filtering across thousands of product records can quickly degrade database performance if queries rely on unindexed columns or generate memory-heavy `filesort` operations. 

This project solves this bottleneck by implementing:
1. **Dynamic Parameterized SQL Builder:** Constructs flexible multi-attribute `WHERE` clauses safely at runtime without string concatenation.
2. **Composite & B-Tree Indexing:** Optimizes query execution plans, dropping full table scans down to targeted index range scans.
3. **Asynchronous Frontend Engine:** Real-time catalog filtering, sorting, and pagination without full-page reloads.

---

## ✨ Key Features

- **⚡ Multi-Attribute Filtering:** Combined real-time filtering across keywords, categories, brands, price ranges, ratings, stock status, and lifecycle states.
- **🛡️ Secure Query Engine:** 100% parameterized SQL queries preventing SQL injection vulnerabilities.
- **🚀 Query Optimization:** Composite B-Tree indexing configured following the **Equality → Range → Sort (ERS)** pattern.
- **🔄 Live Asynchronous Updates:** Interactive UI powered by vanilla JavaScript `Fetch API` with input debouncing.
- **📄 Server-Side Pagination:** Low-memory footprint pagination using dynamic `LIMIT` and `OFFSET` clauses.
- **🛠️ Inventory Management:** Full CRUD capabilities for adding, updating, and deactivating catalog records.
- **🧪 Comprehensive Testing:** Unit and integration test suite configured with `pytest`.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Backend** | Python 3.10+, Flask 3.0.3, Flask Blueprints |
| **Database** | MySQL 8.0+ (InnoDB Engine), `mysql-connector-python` |
| **Frontend** | HTML5, CSS3, JavaScript (ES6+ Fetch API), Bootstrap 5 |
| **Testing** | Pytest 8.2+ |
| **Environment & Tooling** | `python-dotenv`, Git, GitHub |

---

## 🏗️ System Architecture

```text
ecommerce-product-catalog/
├── app/
│   ├── __init__.py           # Application factory & global error handlers
│   ├── config.py             # Environment configuration & connection pooling
│   ├── routes/               # Modular Flask Blueprints
│   │   ├── api_routes.py     # RESTful JSON endpoints
│   │   ├── product_routes.py # Server-rendered UI views
│   │   └── category_routes.py
│   ├── services/             # Business logic & payload validation
│   │   └── product_service.py
│   ├── repositories/         # Parameterized dynamic SQL queries & DB layer
│   │   └── product_repository.py
│   ├── templates/            # Jinja2 templates (Bootstrap 5)
│   └── static/               # Custom styling and async client JavaScript
│       ├── css/style.css
│       └── js/products.js
├── database/
│   ├── schema.sql            # Table definitions with constraints
│   ├── seed.sql              # Core categories and brands seed
│   ├── indexes.sql           # B-Tree, composite, and full-text indexes
│   ├── optimization.sql      # EXPLAIN benchmark queries
│   └── seed_generator.py     # 1,000+ realistic product records generator
├── tests/                    # Pytest test suite
├── requirements.txt
├── run.py                    # Entry point
└── README.md
