---
title: Handling Safety Settings in Vertex AI Gemini's `generateContent`
date: 2024-03-25
tags:
  - AI
  - gemini
  - java
---
When working with Vertex AI's `generateContent` functionality, you may encounter situations where exceptions are thrown due to the safety settings in place. These safety settings are designed to prevent the generation of harmful or inappropriate content. However, in some cases, you may need to adjust these settings based on your specific requirements.

One common issue that developers face is the generation of exceptions when the safety settings are too restrictive. To address this, Vertex AI provides the option to set the safety settings to `BLOCK_ONLY_HIGH`, allowing more flexibility while still maintaining a reasonable level of content moderation.

Here's an example code snippet in Java that demonstrates how to set the safety settings to `BLOCK_ONLY_HIGH` when using the `generateContent` method:

```java
private static final List<SafetySetting> safetySettings = Arrays.asList(  
    SafetySetting.newBuilder()  
        .setCategory(HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT)  
        .setThreshold(HarmBlockThreshold.BLOCK_ONLY_HIGH)  
        .build(),  
    SafetySetting.newBuilder()  
        .setCategory(HarmCategory.HARM_CATEGORY_HARASSMENT)  
        .setThreshold(HarmBlockThreshold.BLOCK_ONLY_HIGH)  
        .build(),  
    SafetySetting.newBuilder()  
        .setCategory(HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT)  
        .setThreshold(HarmBlockThreshold.BLOCK_ONLY_HIGH)  
        .build(),  
    SafetySetting.newBuilder()  
        .setCategory(HarmCategory.HARM_CATEGORY_HATE_SPEECH)  
        .setThreshold(HarmBlockThreshold.BLOCK_ONLY_HIGH)  
        .build(),  
    SafetySetting.newBuilder()  
        .setCategory(HarmCategory.HARM_CATEGORY_UNSPECIFIED)  
        .setThreshold(HarmBlockThreshold.BLOCK_ONLY_HIGH)  
        .build()  
);

public static String safetyCheck(String projectId, String location, String modelName,
          String textPrompt) throws Exception {
    // Initialize client that will be used to send requests. This client only needs
    // to be created once, and can be reused for multiple requests.
    try (VertexAI vertexAI = new VertexAI(projectId, location)) {
      StringBuilder output = new StringBuilder();

      GenerationConfig generationConfig =
          GenerationConfig.newBuilder()
              .setMaxOutputTokens(2048)
              .setTemperature(0.4F)
              .setTopK(32)
              .setTopP(1)
              .build();

      GenerativeModel model = new GenerativeModel(modelName, generationConfig, vertexAI);

      GenerateContentResponse response = model.generateContent(
          textPrompt,
          safetySettings
      );
      output.append(response).append("\n");

      // Verifies if the above content has been blocked for safety reasons.
      boolean blockedForSafetyReason = response.getCandidatesList()
          .stream()
          .anyMatch(candidate -> candidate.getFinishReason() == Candidate.FinishReason.SAFETY);
      output.append("Blocked for safety reasons?: ").append(blockedForSafetyReason);

      return output.toString();
    }
  }
```

In this example, we create a list of `SafetySetting` objects for the `HARM_CATEGORY_HATE_SPEECH` and `HARM_CATEGORY_DANGEROUS_CONTENT` categories. For each category, we set the `HarmBlockThreshold` to `BLOCK_ONLY_HIGH`, which means that only highly harmful content will be blocked, while low and medium-level potentially harmful content will be allowed.

By adjusting the safety settings in this way, you can strike a balance between content moderation and the flexibility to generate more diverse outputs. However, it's important to note that setting the safety settings to `BLOCK_ONLY_HIGH` may increase the risk of generating potentially harmful content, so it's crucial to review the generated outputs carefully and ensure compliance with your content policies and guidelines.

In summary, if you encounter exceptions or overly restrictive content moderation when using Vertex AI's `generateContent`, consider adjusting the safety settings to `BLOCK_ONLY_HIGH` while maintaining appropriate safeguards and reviewing the generated content thoroughly.