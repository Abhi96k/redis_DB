<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>README</title>
</head>
<body>

<h2>Queues</h2>

<h2>Pub Subs</h2>

<h2>Redis</h2>

<h3>Redis Overview</h3>

<p><strong>Redis</strong> is an open-source, in-memory data structure store, used as a <strong>database</strong>, <strong>cache</strong>, and <strong>message broker</strong>.</p>

<p>One of the key features of Redis is its ability to keep all data in memory, which allows for <strong>high performance</strong> and <strong>low latency access</strong> to data.</p>

<img src="diagram-export-10-17-2024-6_21_27-PM-1.png" alt="Diagram" width="600" height="400" />

<h3>Starting Redis Locally</h3>

<p>Let’s start Redis locally and begin using it as a database.</p>

<h4>Starting Redis with Docker</h4>

<pre><code>docker run --name my-redis -d -p 6379:6379 redis
</code></pre>

<h4>Connecting to Your Container</h4>

<pre><code>docker exec -it container_id /bin/bash
</code></pre>

<h4>Connecting to the Redis CLI</h4>

<pre><code>docker exec -it my-redis redis-cli
</code></pre>

<hr>

<h3>Redis as a Database</h3>

<h4>SET/GET/DEL Commands</h4>

<h5>Setting Data</h5>

<pre><code>SET mykey "Hello"
</code></pre>

<h5>Getting Data</h5>

<pre><code>GET mykey
</code></pre>

<h5>Deleting Data</h5>

<pre><code>DEL mykey
</code></pre>

<hr>

<h4>HSET/HGET/HDEL (Hashes)</h4>

<h5>Setting Data in a Hash</h5>

<pre><code>HSET user:100 name "John Doe" email "user@example.com" age "30"
</code></pre>

<h5>Getting Data from a Hash</h5>

<pre><code>HGET user:100 name
HGET user:100 email
</code></pre>

</body>
</html>
