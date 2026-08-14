# FormBox

> **Build forms. Collect responses.**

FormBox is a modern, lightweight form builder that lets users create custom forms, share them through public links, collect responses, and export submitted data.

Built as a full-stack portfolio project with a focus on clean UX, dynamic form building, authentication, database relationships, and modern web development.

## ✨ Features

### Form Management

* Create forms
* Edit existing forms
* Delete forms
* Save forms as drafts
* Publish forms
* Close published forms
* Generate unique public URLs
* Preview forms before publishing

### Dynamic Form Builder

FormBox supports multiple question types:

* Short text
* Long text
* Number
* Multiple choice
* Checkbox
* Dropdown
* Rating

Questions can be:

* Added
* Edited
* Deleted
* Reordered
* Marked as required
* Configured with custom options

### Public Forms

Published forms can be accessed through a unique URL without requiring an account.

Example:

```text
https://formbox.app/f/customer-feedback-x8f2
```

Visitors can fill out and submit forms directly.

### Response Management

Form owners can:

* View submitted responses
* Open individual responses
* See submission timestamps
* Delete responses
* Export responses as CSV

### Authentication

Users can:

* Create an account
* Log in
* Log out
* Manage their profile
* Access only their own forms and responses

### UI & UX

* Responsive design
* Dark-first visual identity
* Purple and green accent system
* Smooth GSAP animations
* Loading states
* Empty states
* Error handling
* Form validation
* Accessible form controls

---

## 🛠️ Tech Stack

### Frontend / Full-stack

* [Next.js](https://nextjs.org/)
* TypeScript
* Tailwind CSS
* GSAP

### Backend

* Next.js Server Actions
* Next.js Route Handlers

### Database & Authentication

* Supabase
* PostgreSQL
* Supabase Auth

### Supporting Libraries

* Zod
* React Hook Form
* Lucide React
* date-fns

---

## 🎨 Brand

FormBox uses a minimal, modern SaaS aesthetic.

### Colors

| Color           | Hex       | Usage                     |
| --------------- | --------- | ------------------------- |
| Ink             | `#0B0B0F` | Primary dark background   |
| Ink Light       | `#141419` | Secondary dark surfaces   |
| Electric Violet | `#7C3AED` | Primary brand color       |
| Violet Light    | `#8B5CF6` | Hover/secondary purple    |
| Fresh Green     | `#22C55E` | Success and active states |
| Soft White      | `#FAFAFA` | Light backgrounds         |
| Gray            | `#71717A` | Secondary text            |
| Border          | `#27272A` | Dark UI borders           |

The visual identity is built around **black, violet, green, and white**, with purple acting as the primary brand accent and green representing successful actions and published/active states.

---

## 📁 Project Structure

```text
formbox/
│
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   │
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   │
│   ├── dashboard/
│   │   └── page.tsx
│   │
│   ├── forms/
│   │   ├── new/
│   │   │   └── page.tsx
│   │   └── [id]/
│   │       ├── page.tsx
│   │       ├── preview/
│   │       │   └── page.tsx
│   │       └── responses/
│   │           └── page.tsx
│   │
│   ├── f/
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── settings/
│   │   └── page.tsx
│   │
│   └── api/
│       └── public/
│           └── forms/
│               └── [slug]/
│                   └── submit/
│                       └── route.ts
│
├── actions/
│   ├── forms.ts
│   ├── questions.ts
│   └── responses.ts
│
├── components/
│   ├── ui/
│   ├── forms/
│   ├── dashboard/
│   ├── landing/
│   └── animations/
│
├── hooks/
│
├── lib/
│   ├── supabase/
│   ├── validations/
│   ├── csv.ts
│   └── utils.ts
│
├── types/
│
├── public/
│
├── .env.local
├── next.config.ts
├── package.json
└── README.md
```

---

## 🗄️ Database Structure

FormBox uses PostgreSQL through Supabase.

```text
profiles
    │
    │ 1:N
    ▼
forms
    │
    ├───────────────┐
    │               │
    │ 1:N           │ 1:N
    ▼               ▼
questions       responses
                    │
                    │ 1:N
                    ▼
                  answers
```

### Profiles

Stores public user information associated with Supabase Auth users.

```text
profiles
├── id
├── name
├── email
├── created_at
└── updated_at
```

### Forms

Stores form information.

```text
forms
├── id
├── user_id
├── title
├── description
├── slug
├── status
├── created_at
├── updated_at
└── published_at
```

Possible statuses:

```text
draft
published
closed
```

### Questions

Stores individual form questions.

```text
questions
├── id
├── form_id
├── type
├── label
├── description
├── required
├── position
├── options
└── created_at
```

### Responses

Represents an individual form submission.

```text
responses
├── id
├── form_id
└── submitted_at
```

### Answers

Stores the answer to each question within a response.

```text
answers
├── id
├── response_id
├── question_id
└── value
```

The `value` column uses PostgreSQL `JSONB` to support different answer types.

---

## 🔐 Security

FormBox uses Supabase Row Level Security to protect user data.

Users can only manage their own:

* Forms
* Questions
* Responses
* Profile information

Public visitors can only access forms that have been published.

Response submission is validated server-side to prevent invalid or malicious data from being inserted.

Additional protections include:

* Server-side validation with Zod
* Authentication checks
* Form ownership checks
* Required-field validation
* Question type validation
* Rate limiting for public submissions

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/formbox.git

cd formbox
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a Supabase project

Create a project in Supabase and obtain:

* Project URL
* Anon/Public Key

### 4. Configure environment variables

Create:

```text
.env.local
```

Add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

If the application requires server-only Supabase credentials, add the appropriate server-side environment variable as well and **never expose service-role credentials to the client**.

### 5. Set up the database

Run the project's SQL schema and RLS policies in the Supabase SQL Editor.

The database should contain:

```text
profiles
forms
questions
responses
answers
```

### 6. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🧪 Development

Run the development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

Run linting:

```bash
npm run lint
```

---

## 🔄 Application Flow

A typical FormBox workflow looks like this:

```text
Create Account
      ↓
Login
      ↓
Dashboard
      ↓
Create Form
      ↓
Add Questions
      ↓
Customize Form
      ↓
Preview
      ↓
Publish
      ↓
Generate Public URL
      ↓
Share Form
      ↓
Receive Responses
      ↓
View Responses
      ↓
Export CSV
```

---

## 🗺️ Roadmap

### MVP

* [x] Project setup
* [ ] Authentication
* [ ] Dashboard
* [ ] Form CRUD
* [ ] Dynamic form builder
* [ ] Question types
* [ ] Question reordering
* [ ] Form preview
* [ ] Form publishing
* [ ] Public form URLs
* [ ] Response collection
* [ ] Response dashboard
* [ ] CSV export
* [ ] Responsive UI
* [ ] GSAP animations
* [ ] Production deployment

### Future

Potential future features include:

* [ ] Form duplication
* [ ] Response statistics
* [ ] Search and filtering
* [ ] Custom thank-you messages
* [ ] Custom form themes
* [ ] Form templates
* [ ] File upload questions
* [ ] Email notifications
* [ ] Webhooks
* [ ] Embeddable forms
* [ ] Advanced analytics
* [ ] Custom domains

---

## 🎯 Project Goals

FormBox is designed to demonstrate practical full-stack development skills including:

* Next.js App Router
* TypeScript
* Server Components
* Server Actions
* Route Handlers
* PostgreSQL database design
* Supabase authentication
* Row Level Security
* CRUD operations
* Dynamic form generation
* Server-side validation
* REST-style endpoints
* Responsive UI development
* Animation with GSAP
* CSV data generation
* Production deployment

---

## 📸 Screenshots

Screenshots will be added once the main UI is complete.

Planned screenshots:

* Landing page
* Dashboard
* Form builder
* Form preview
* Public form
* Response dashboard

---

## 🚀 Deployment

Recommended deployment setup:

```text
┌──────────────────────┐
│       Vercel         │
│      Next.js         │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│      Supabase        │
│                      │
│  PostgreSQL + Auth   │
└──────────────────────┘
```

FormBox can be deployed directly to Vercel while Supabase handles the database and authentication infrastructure.

---

## 📄 License

This project is available under the MIT License.

---

## 👨‍💻 Author

Built by **Munachi**.

A full-stack development project focused on building a simple, polished, and practical form collection experience.

---

<p align="center">
  <strong>FormBox</strong>
  <br />
  Build forms. Collect responses.
</p>
