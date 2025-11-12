**Table of Contents**

- [Preface](#preface)
- [Requirements and Assumptions](#requirements-and-assumptions)
	- [Requirements](#requirements)
	- [Assumptions](#assumptions)
- [Implementation Details](#implementation-details)
- [Future Considerations](#future-considerations)
- [Using the Application](#using-the-application)
	- [Getting Started](#getting-started)
	- [Building for Production](#building-for-production)
    - [Deployment](#deployment)

---
# Preface
When I first opened the instructions for this coding challenge, I was quite surprised to see that it was nearly identical to the challenge I received while interviewing at Frontline over 8 years ago. You can check out that project here: https://github.com/ddups/frontline-coding-demo

I wasn't sure how to handle this situation - it felt like cheating to essentially rewrite the base code in C# given it's extreme similarities to Java.

I decided that since I already had a deep understanding of the concepts involved with solving the problem, I would challenge myself to do something I haven't really done before - create a React app from scratch and solve the challenge in a new language. This turned out to be more challenging than I expected, but I was able to use the [React documentation](https://react.dev/learn/) and plenty of Googling to get through it.

Although I recognize that this is far from a production-quality React app, I am proud of what I was able to accomplish in a few hours. I also admit that this actually only solves the first part of the problem, but given my previous solution, I hope that this doesn't detract from my "score" and instead shows just how much I really want this position. 

---
# Requirements and Assumptions
## Requirements
Convert a string consisting of a comma-separated list of grouped items into a "hierarchy" based on their groupings.

The only other requirement I could glean from the instructions was to provide a runnable app for demo purposes.

## Assumptions
1) Whitespace within the input string should be ignored and removed before processing
2) Input strings must start and end with '(' and ')' respectively
3) Input strings may contain any alphanumeric characters, and must contain at least one
4) Input strings may contain ':' and a subsequent value (e.g. id:1234)...

---
# Implementation Details
As previously stated, this was my first time creating a React application from the ground up, so I knew that I would need to start with a template of some sort. I used the `create-react-router` command (recommended by the [React documentation](https://react.dev/learn/creating-a-react-app)) to initialize the project.

After I had the project setup, I spent some time looking through the documentation and getting familiar with how React works (functions, forms, etc.) and then laid out the components that I thought I would need to create.

The "Welcome" project that was setup by the create command used [Tailwind CSS](https://tailwindcss.com/docs) so I just stuck with that even though it was also unfamiliar to me. I found it to be mostly intuitive once I understood a little bit of the syntax, but I kept it very basic because I thought my time would be better spent on the actual functionality.

The app consists of a single text input and a button to kick off the "parsing" of the string. I reused some of the logic from my previous solution, and I started by simply printing the parsed output on the console. Once I felt like I had the parsing down, I moved on to figuring out how to display it on the page.

I figured out how to pass data from the main component to the child components, and return it via callbacks (also a common method in Angular development) and finally had a solution that I was happy with.

## Test Input
Here are some additional test cases that I used to challenge my requirements and assumptions:
#### Valid strings
- Begins with sub-record
  - `(employee(id,firstname,employeeType(id),lastname),id,created,location)`
- Ends with sub-record
  - `(id,created,location,employee(id,firstname,employeeType(id),lastname))`
- Record with single child, no sub-record
  - `(employee)`
- Record with sub-record as only child with second layer sub-record
  - `(employee(employeeType(id)))`
- Record with values included
  - `(id:123456,created:202051112,employee(id:4444,firstname:Derek,employeeType(id:404),lastname:Dupuis),location:Dover)`
- Record with extra whitespace
  - `( employee ( employeeType ( id ) ) )`

#### Invalid strings
- Empty record
  - `()`
- Record with empty sub-record
  - `(employee())`
- Begins with comma
  - `(,employee,location)`
- Ends with comma
  - `(employee,location,)`
- Begins with two left parentheses - mismatched
  - `((employee)`
- Ends with two right parentheses - mismatched
  - `(employee))`
- Ends with left parenthesis
  - `(employee()`
- Missing initial left parenthesis
  - `employee)`
- Missing ultimate right parenthesis
  - `(employee`
- Missing both outside parentheses
  - `employee`

---
# Future Considerations
Obviously the first thing I would do if I had more time/knowledge of React would be to actually solve both parts of the challenge. My original solution for the Frontline challenge used a recursive strategy to represent the "Records", and utilized a TreeMap for storing the values to automatically have things in alphabetical order. This is *a lot* more complicated to do in TypeScript, especially with a limited working knowledge of the React framework.

I would also have liked to include things like logging, unit testing, and probably would consider using some advanced Regex to quickly parse out the groups of properties, which would likely be more performant than iterating over the string.

---
# Using the Application
As previously stated, this project was bootstrapped with the `create-react-router` command. It provides a full framework for creating a React application with no build configuration.

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```