"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("aws-cdk-lib/core");
const s3_eventbridge_lambda_stack_1 = require("../stack/s3-eventbridge-lambda-stack");
test('Creates the s3-eventbridge-lambda stack without exceptions', () => {
    expect(() => {
        new s3_eventbridge_lambda_stack_1.CdkStack(new cdk.App(), 'MyTestStack1');
    }).not.toThrow();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjZGsudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUF3QztBQUN4QyxzRkFBZ0U7QUFFaEUsSUFBSSxDQUFDLDREQUE0RCxFQUFFLEdBQUcsRUFBRTtJQUNwRSxNQUFNLENBQUMsR0FBRyxFQUFFO1FBQUcsSUFBSSxzQ0FBUSxDQUFDLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFBO0lBQzFELENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNyQixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYi9jb3JlJztcbmltcG9ydCB7IENka1N0YWNrIH0gZnJvbSAnLi4vc3RhY2svczMtZXZlbnRicmlkZ2UtbGFtYmRhLXN0YWNrJztcblxudGVzdCgnQ3JlYXRlcyB0aGUgczMtZXZlbnRicmlkZ2UtbGFtYmRhIHN0YWNrIHdpdGhvdXQgZXhjZXB0aW9ucycsICgpID0+IHtcbiAgICBleHBlY3QoKCkgPT4geyBuZXcgQ2RrU3RhY2sobmV3IGNkay5BcHAoKSwgJ015VGVzdFN0YWNrMScpIFxuICAgIH0pLm5vdC50b1Rocm93KCk7XG59KTsiXX0=