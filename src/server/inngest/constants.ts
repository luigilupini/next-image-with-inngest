export const Events = {
  UploadCameraImage: 'review/image-uploaded',
  NewBackgroundRequested: 'review/new-background-requested',
} as const

export const Functions = {
  UploadCameraImage: 'review.uploadCameraImage',
  NewBackgroundImage: 'review.newBackgroundImage',
} as const

export const Steps = {
  CreateReviewStream: 'review.stream',
  CreateTheme: 'theme.create',
  GenerateImage: 'image.generate',
} as const
