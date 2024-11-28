import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import Server from './server/server.js';
dotenv.config();

const server = new Server()

server.listen()