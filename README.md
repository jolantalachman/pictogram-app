# Pictogram-Based Mobile Application for Sentence Building

## Description

A mobile application built using **Ionic** and **Angular**, designed to run on the **Android** platform. Its purpose is to enable users to construct sentences using sequences of pictograms. The application is designed for individuals who have difficulties with verbal communication, including people with autism, aphasia, as well as children learning basic words and phrases.

Users can select pictograms from an available library and combine them into sequences to create simple messages. The system allows users to save created sentences and replay them later.

## Features

* **Pictogram Selection**: Users can browse different categories of pictograms and select them to build a sentence.
* **Sequence Creation**: After selecting pictograms, users can arrange them into sequences that represent a logical statement.
* **Simple User Interface**: An intuitive interface enables easy navigation, which is especially important for users with diverse educational and accessibility needs.
* **Grammar Improvement with OpenAI**: The application includes a feature for automatic grammatical correction of constructed sentences. Users can send their sequences to the OpenAI API, which analyzes the text and suggests grammatical improvements. This feature supports users who have difficulty forming complete sentences.

## Technologies

* **Ionic**: A framework for building mobile applications that allows development for iOS and Android using web technologies (HTML, CSS, JavaScript).
* **Angular**: A frontend framework that supports component-based application development.
* **Firebase**: Used for cloud data storage of user data and saved sentences, and **Firebase Functions** are used to handle communication with the OpenAI API.
* **Pictograms**: The application includes a set of pictograms for building sentences.
* **OpenAI API**: A service for text processing and analysis, used for improving the grammar of constructed sentences.
