export const INITIAL_SCHEMA = `openapi: 3.0.4
info:
  title: AURA Orbital Gateway API
  version: 1.0.0
  description: |
    Welcome to the **AURA OpenAPI Specification & Testing Suite**.

    This interactive environment demonstrates the core capabilities of the application:
    * **Real-time Validation**: Syntax checking and OpenAPI 3.x compliance with instant diagnostics.
    * **Format Switching**: Seamless bidirectional conversion between YAML and JSON via the toolbar toggle.
    * **Interactive Documentation**: Organized endpoint explorer with parameters, schemas, and response definitions.
    * **Try It Out**: Direct HTTP execution against the public sandbox server through the built-in CORS proxy.

    > *Connect, test, and document cloud protocols with speed and precision.*

servers:
  - url: https://jsonplaceholder.typicode.com
    description: Public Sandbox Server (Supports live Try-It-Out execution)
  - url: https://api.aura-network.dev/v1
    description: Primary Orbital Core Cluster

paths:
  /posts:
    get:
      tags:
        - Telemetry
      summary: Retrieve telemetry streams
      description: Returns a paginated stream of subsystem status records.
      parameters:
        - name: userId
          in: query
          description: Filter records by operator ID
          required: false
          schema:
            type: integer
            example: 1
        - name: X-AURA-Trace
          in: header
          description: Distributed tracing identifier
          required: false
          schema:
            type: string
            example: trace-orbital-01
      responses:
        "200":
          description: Telemetry data retrieved successfully
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    id:
                      type: integer
                    title:
                      type: string
                    body:
                      type: string
                    userId:
                      type: integer
    post:
      tags:
        - Transmission
      summary: Dispatch command payload
      description: Transmits a command packet to orbital relays.
      requestBody:
        description: Command payload specifications
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - title
                - body
                - userId
              properties:
                title:
                  type: string
                  example: Orbit Stabilization
                body:
                  type: string
                  example: Initiating attitude control thrusters for station stabilization.
                userId:
                  type: integer
                  example: 1
      responses:
        "201":
          description: Command accepted and queued
        "400":
          description: Invalid command payload parameters

  /posts/{id}:
    get:
      tags:
        - Telemetry
      summary: Inspect subsystem diagnostic
      description: Fetch comprehensive health diagnostics for a specific subsystem by identifier.
      parameters:
        - name: id
          in: path
          description: Subsystem telemetry record ID
          required: true
          schema:
            type: integer
            example: 1
      responses:
        "200":
          description: Subsystem diagnostic located
        "404":
          description: Diagnostic record not found
    delete:
      tags:
        - Transmission
      summary: Purge diagnostic cache
      description: Decommissions and purges an obsolete telemetry log.
      parameters:
        - name: id
          in: path
          description: ID of record to purge
          required: true
          schema:
            type: integer
            example: 1
      responses:
        "200":
          description: Cache purged successfully
        "404":
          description: Record not found
`;
