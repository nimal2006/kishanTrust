export const openApiSpec = {
  openapi: "3.0.2",
  info: {
    title: "Farmer Credit Intelligence Platform",
    description: "Agricultural credit assessment system with verified data and community trust",
    version: "1.0.0",
  },
  paths: {
    "/": {
      get: {
        summary: "Root endpoint",
        description: "Returns API information and operational status",
        responses: {
          "200": {
            description: "Successful Response",
            content: { "application/json": { schema: { type: "object" } } },
          },
        },
      },
    },
    "/health": {
      get: {
        summary: "Health check",
        description: "Health check endpoint verifying system and database state",
        responses: {
          "200": {
            description: "Successful Response",
            content: { "application/json": { schema: { type: "object" } } },
          },
        },
      },
    },
    "/api/v1/farmers/": {
      get: {
        tags: ["Farmers"],
        summary: "List all farmers",
        parameters: [
          { name: "skip", in: "query", schema: { type: "integer", default: 0 } },
          { name: "limit", in: "query", schema: { type: "integer", default: 100 } },
        ],
        responses: {
          "200": { description: "Successful Response" },
        },
      },
      post: {
        tags: ["Farmers"],
        summary: "Create farmer",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "phone"],
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  phone: { type: "string" },
                  address: { type: "string" },
                  land_size_acres: { type: "number" },
                  crop_types: { type: "string" },
                  fpo_id: { type: "integer" },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "Farmer created successfully" },
          "400": { description: "Email already registered" },
        },
      },
    },
    "/api/v1/farmers/{farmer_id}": {
      get: {
        tags: ["Farmers"],
        summary: "Get farmer details",
        parameters: [{ name: "farmer_id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          "200": { description: "Successful Response" },
          "404": { description: "Farmer not found" },
        },
      },
      put: {
        tags: ["Farmers"],
        summary: "Update farmer",
        parameters: [{ name: "farmer_id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  phone: { type: "string" },
                  address: { type: "string" },
                  land_size_acres: { type: "number" },
                  crop_types: { type: "string" },
                  fpo_id: { type: "integer" },
                  verified: { type: "boolean" },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Successful Response" },
          "404": { description: "Farmer not found" },
        },
      },
      delete: {
        tags: ["Farmers"],
        summary: "Delete farmer",
        parameters: [{ name: "farmer_id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          "204": { description: "Successful Response" },
          "404": { description: "Farmer not found" },
        },
      },
    },
    "/api/v1/fpo/": {
      get: {
        tags: ["FPO Management"],
        summary: "List all FPOs",
        parameters: [
          { name: "skip", in: "query", schema: { type: "integer", default: 0 } },
          { name: "limit", in: "query", schema: { type: "integer", default: 100 } },
        ],
        responses: { "200": { description: "Successful Response" } },
      },
      post: {
        tags: ["FPO Management"],
        summary: "Create FPO",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "registration_number"],
                properties: {
                  name: { type: "string" },
                  registration_number: { type: "string" },
                  address: { type: "string" },
                  contact_person: { type: "string" },
                  contact_email: { type: "string" },
                  contact_phone: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "FPO created successfully" },
          "400": { description: "Registration number already exists" },
        },
      },
    },
    "/api/v1/fpo/{fpo_id}": {
      get: {
        tags: ["FPO Management"],
        summary: "Get FPO details",
        parameters: [{ name: "fpo_id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          "200": { description: "Successful Response" },
          "404": { description: "FPO not found" },
        },
      },
      put: {
        tags: ["FPO Management"],
        summary: "Update FPO",
        parameters: [{ name: "fpo_id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  address: { type: "string" },
                  contact_person: { type: "string" },
                  contact_email: { type: "string" },
                  contact_phone: { type: "string" },
                  member_count: { type: "integer" },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Successful Response" },
          "404": { description: "FPO not found" },
        },
      },
      delete: {
        tags: ["FPO Management"],
        summary: "Delete FPO",
        parameters: [{ name: "fpo_id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          "204": { description: "Successful Response" },
          "404": { description: "FPO not found" },
        },
      },
    },
    "/api/v1/fpo/{fpo_id}/members": {
      get: {
        tags: ["FPO Management"],
        summary: "Get all farmers in an FPO",
        parameters: [{ name: "fpo_id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          "200": { description: "Successful Response" },
          "404": { description: "FPO not found" },
        },
      },
    },
    "/api/v1/assessments/": {
      get: {
        tags: ["Credit Assessments"],
        summary: "List all credit assessments",
        parameters: [
          { name: "skip", in: "query", schema: { type: "integer", default: 0 } },
          { name: "limit", in: "query", schema: { type: "integer", default: 100 } },
          { name: "farmer_id", in: "query", schema: { type: "integer" } },
          { name: "status_filter", in: "query", schema: { type: "string", enum: ["pending", "under_review", "approved", "rejected"] } },
        ],
        responses: { "200": { description: "Successful Response" } },
      },
      post: {
        tags: ["Credit Assessments"],
        summary: "Create credit assessment",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["farmer_id", "loan_amount", "purpose"],
                properties: {
                  farmer_id: { type: "integer" },
                  loan_amount: { type: "number" },
                  purpose: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "Credit assessment created successfully" },
          "404": { description: "Farmer not found" },
        },
      },
    },
    "/api/v1/assessments/{assessment_id}": {
      get: {
        tags: ["Credit Assessments"],
        summary: "Get credit assessment details",
        parameters: [{ name: "assessment_id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          "200": { description: "Successful Response" },
          "404": { description: "Credit assessment not found" },
        },
      },
      put: {
        tags: ["Credit Assessments"],
        summary: "Update credit assessment",
        parameters: [{ name: "assessment_id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string", enum: ["pending", "under_review", "approved", "rejected"] },
                  credit_score: { type: "number" },
                  assessment_data: { type: "string" },
                  ai_explanation: { type: "string" },
                  verified_by_fpo: { type: "boolean" },
                  fpo_comments: { type: "string" },
                  bank_comments: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Successful Response" },
          "404": { description: "Credit assessment not found" },
        },
      },
      delete: {
        tags: ["Credit Assessments"],
        summary: "Delete credit assessment",
        parameters: [{ name: "assessment_id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          "204": { description: "Successful Response" },
          "404": { description: "Credit assessment not found" },
        },
      },
    },
  },
};
