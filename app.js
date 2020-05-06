/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START gae_node_request_example]
const express = require('express');
const pdf = require('html-pdf')

const app = express();

const toPdfBuffer = async (html) => {
  return new Promise((resolve, reject) => {
    const wrappedHtml = `<div style='margin: 72px;'>${html}</div>`
    pdf.create(wrappedHtml, { format: 'Letter' }).toBuffer((err, buffer) => {
      if (err) reject(err)
      resolve(buffer)
    })
  })
}

app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello, world!')
    .end();
});

app.get('/download', async (req, res) => {
  const buffer = await toPdfBuffer('<h1>hi</h1>')
  res.contentType('application/pdf')
  // res.setHeader('Content-Disposition', `attachment; filename=test.pdf`)
  res.end(buffer)
});

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

app.get('/timed', async (req, res) => {
  res.status(200).send('hi').end()
  await wait(1000)
  console.log('waited')
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

module.exports = app;
