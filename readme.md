
![Logo](/public/screenshots/prepit_landscape.png)

# **PrepIt**

A sleek and user-friendly mock test web application designed to provide a real-world exam experience. It includes a custom-built CMS for comprehensive content, user, and payment management.

## **Main App Features**

**Custom Tests**
   - **Topic Test**: Focus on a specific topic.
   - **Section Test**: Covers multiple topics under a single section.
   - **MockMini and MockFull Tests**: Full-length tests with three sections, varying in the number of questions.

   ![Custom Test Creation](/public/screenshots/customtest.png)

**Test Environment**
   - Realistic interface replicating exams like NAT, CAT, XAT, and JEE.

   ![Test Environment](/public/screenshots/testui1.png/)
   ![Test Environment](/public/screenshots/testui2.png/)

**Detailed PDF Reports**
   - Available for MockMini and MockFull tests.
   - Includes total score, section-wise breakdown, correct/incorrect/not attempted answers, and a detailed answer key.

   ![PDF Report Example](/public//screenshots/reports.png)

**Help Desk**
   - Raise and track queries with four statuses: Open, Resolved, Reopened, and Closed.

   ![Help Desk UI](/public/screenshots/helpdesk.png)


## **CMS Features**

**Dashboard**
   - Quick overview of total revenue, sales, subscriptions, active users, recent queries (table), and recent sales.

   ![Dashboard Overview](/public/screenshots/dashboard.png)

**Questions Management**
   - Upload questions for three sections: quantitative aptitude (QA), data interpretation and logical reasoning (DILR), and verbal ability and reading comprehension (VARC) via a spreadsheet.
   - Downloadable spreadsheet format for ease of use.
   - Edit or delete specific questions.

   ![Questions Management](/public/screenshots/questions1.png)
   ![Questions Management](/public/screenshots/questions2.png)

**User Management**
   - View and manage main site users, including subscription status and the ability to ban/unban users.

**Payments**
   - View detailed records of all payments.

   ![Payments Management](/public/screenshots/payments.png)

**Coupons**
   - Manage discount coupons for subscriptions.

   ![Coupons Management](/public/screenshots/coupons.png)

**Settings**
   - Configure test settings, including:
     - Number of questions.
     - Test duration.
     - Case-based question inclusion.

   ![Test Settings](/public/screenshots/settings.png)
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

**Main App Firebase Keys:**
- `NEXT_PUBLIC_FIREBASE_apiKey`
- `NEXT_PUBLIC_FIREBASE_authDomain`
- `NEXT_PUBLIC_FIREBASE_projectId`
- `NEXT_PUBLIC_FIREBASE_storageBucket`
- `NEXT_PUBLIC_FIREBASE_messagingSenderId`
- `NEXT_PUBLIC_FIREBASE_appId`

**Main App PhonePe Keys:**
- `PHONEPE_BASE_URL`
- `PHONEPE_SALT_KEY`
- `PHONEPE_SALT_INDEX`
- `PHONEPE_MERCHANT_ID`

**Main App Other Keys:**
- `SECRET_KEY`
- `BASE_AMOUNT`

**CMS Firebase Keys:**
- `NEXT_PUBLIC_FIREBASE_apiKey`
- `NEXT_PUBLIC_FIREBASE_authDomain`
- `NEXT_PUBLIC_FIREBASE_projectId`
- `NEXT_PUBLIC_FIREBASE_storageBucket`
- `NEXT_PUBLIC_FIREBASE_messagingSenderId`
- `NEXT_PUBLIC_FIREBASE_appId`

**CMS Other Keys:**
- `SECRET_KEY`
## Installation and Setup

Clone the repository:

```bash
git clone https://github.com/mehulsaini763/prepit.git
```
Navigate to the project directory:

```bash
cd prepit
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```
## **Tech Stack**
- **Frontend**: React.js, Next.js, 
- **Backend**: Node.js, Firebase
- **UI**: Tailwind, Material-Tailwind
- **PDF Generation**: React-PDF
- **Mails**: ZeptoMail
- **Payments**: PhonePe 

## Links

-  **Main App**: [Github](https://github.com/mehulsaini763/prepit) | [Live](https://prepit.vercel.app/) 
- **CMS**: [Github](https://github.com/mehulsaini763/prepit-admin) | [Live](https://prepit-admin.vercel.app/) 