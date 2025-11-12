**Table of Contents**

- [Preface](#preface)
- [Requirements and Assumptions](#requirements-and-assumptions)
	- [Requirements](#requirements)
	- [Assumptions](#assumptions)
- [Implementation Details](#implementation-details)
	- [First Iteration](#first-iteration)
	- [Second Iteration](#second-iteration)
- [Testing](#testing)
	- [Considerations](#considerations)
	- [Running the tests](#running-the-tests)
- [Using the Application](#using-the-application)
	- [Starting the Application](#starting-the-application)
	- [Making a Request](#making-a-request)
- [Future Considerations](#future-considerations)
	- [Potential Enhancements](#potential-enhancements)

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