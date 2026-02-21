"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const s3 = require("aws-cdk-lib/aws-s3");
const lambda = require("aws-cdk-lib/aws-lambda");
const events = require("aws-cdk-lib/aws-events");
const targets = require("aws-cdk-lib/aws-events-targets");
const iam = require("aws-cdk-lib/aws-iam");
class CdkStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        var _a;
        super(scope, id, props);
        const bucket = new s3.Bucket(this, 'sample-eventbridge-bucket', {
            eventBridgeEnabled: true,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY
        });
        const s3ObjectTaggingStatement = new iam.PolicyStatement({
            actions: ['s3:PutObjectTagging'],
            resources: [`${bucket.bucketArn}/*`]
        });
        const lambdaFn = new lambda.Function(this, 's3-event-processor', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'lambda.handler',
            code: lambda.Code.fromAsset('src'),
            functionName: 's3-event-processor',
            memorySize: 256,
            timeout: aws_cdk_lib_1.Duration.seconds(30)
        });
        lambdaFn.addToRolePolicy(s3ObjectTaggingStatement);
        (_a = lambdaFn.role) === null || _a === void 0 ? void 0 : _a.attachInlinePolicy(new iam.Policy(this, 's3-object-tagging-policy', {
            statements: [s3ObjectTaggingStatement],
        }));
        const rule = new events.Rule(this, 'rule', {
            eventPattern: {
                source: ['aws.s3'],
                detailType: [
                    'Object Created'
                ],
                detail: {
                    bucket: {
                        name: [
                            bucket.bucketName
                        ]
                    }
                }
            },
        });
        rule.addTarget(new targets.LambdaFunction(lambdaFn, {
            maxEventAge: aws_cdk_lib_1.Duration.hours(2),
            retryAttempts: 3
        }));
        new aws_cdk_lib_1.CfnOutput(this, 'S3BucketName', { value: bucket.bucketName });
        new aws_cdk_lib_1.CfnOutput(this, 'LambdaFunctionARN', { value: lambdaFn.functionArn });
        new aws_cdk_lib_1.CfnOutput(this, 'EventBridgeRuleARN', { value: rule.ruleArn });
    }
}
exports.CdkStack = CdkStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiczMtZXZlbnRicmlkZ2UtbGFtYmRhLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiczMtZXZlbnRicmlkZ2UtbGFtYmRhLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUFvRjtBQUVwRix5Q0FBeUM7QUFDekMsaURBQWlEO0FBQ2pELGlEQUFpRDtBQUNqRCwwREFBMEQ7QUFDMUQsMkNBQTJDO0FBRTNDLE1BQWEsUUFBUyxTQUFRLG1CQUFLO0lBQ2pDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7O1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sTUFBTSxHQUFHLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsMkJBQTJCLEVBQUU7WUFDOUQsa0JBQWtCLEVBQUUsSUFBSTtZQUN4QixpQkFBaUIsRUFBRSxFQUFFLENBQUMsaUJBQWlCLENBQUMsU0FBUztZQUNqRCxhQUFhLEVBQUUsMkJBQWEsQ0FBQyxPQUFPO1NBQ3JDLENBQUMsQ0FBQztRQUVILE1BQU0sd0JBQXdCLEdBQUcsSUFBSSxHQUFHLENBQUMsZUFBZSxDQUFDO1lBQ3ZELE9BQU8sRUFBRSxDQUFDLHFCQUFxQixDQUFDO1lBQ2hDLFNBQVMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLFNBQVMsSUFBSSxDQUFDO1NBQ3JDLENBQUMsQ0FBQztRQUVILE1BQU0sUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLEVBQUU7WUFDL0QsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxPQUFPLEVBQUUsZ0JBQWdCO1lBQ3pCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7WUFDbEMsWUFBWSxFQUFFLG9CQUFvQjtZQUNsQyxVQUFVLEVBQUUsR0FBRztZQUNmLE9BQU8sRUFBRSxzQkFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7U0FDOUIsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGVBQWUsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ25ELE1BQUEsUUFBUSxDQUFDLElBQUksMENBQUUsa0JBQWtCLENBQy9CLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsMEJBQTBCLEVBQUU7WUFDL0MsVUFBVSxFQUFFLENBQUMsd0JBQXdCLENBQUM7U0FDdkMsQ0FBQyxDQUNILENBQUM7UUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRTtZQUN6QyxZQUFZLEVBQUU7Z0JBQ1osTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUNsQixVQUFVLEVBQUU7b0JBQ1YsZ0JBQWdCO2lCQUNqQjtnQkFDRCxNQUFNLEVBQUU7b0JBQ04sTUFBTSxFQUFFO3dCQUNOLElBQUksRUFBRTs0QkFDSixNQUFNLENBQUMsVUFBVTt5QkFDbEI7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRTtZQUNsRCxXQUFXLEVBQUUsc0JBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzlCLGFBQWEsRUFBRSxDQUFDO1NBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBRUosSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDbEUsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUMxRSxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBRXJFLENBQUM7Q0FDRjtBQXpERCw0QkF5REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZm5PdXRwdXQsIER1cmF0aW9uLCBSZW1vdmFsUG9saWN5LCBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0ICogYXMgczMgZnJvbSAnYXdzLWNkay1saWIvYXdzLXMzJztcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIGV2ZW50cyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZXZlbnRzJztcbmltcG9ydCAqIGFzIHRhcmdldHMgZnJvbSAnYXdzLWNkay1saWIvYXdzLWV2ZW50cy10YXJnZXRzJztcbmltcG9ydCAqIGFzIGlhbSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJztcblxuZXhwb3J0IGNsYXNzIENka1N0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IGJ1Y2tldCA9IG5ldyBzMy5CdWNrZXQodGhpcywgJ3NhbXBsZS1ldmVudGJyaWRnZS1idWNrZXQnLCB7XG4gICAgICBldmVudEJyaWRnZUVuYWJsZWQ6IHRydWUsXG4gICAgICBibG9ja1B1YmxpY0FjY2VzczogczMuQmxvY2tQdWJsaWNBY2Nlc3MuQkxPQ0tfQUxMLFxuICAgICAgcmVtb3ZhbFBvbGljeTogUmVtb3ZhbFBvbGljeS5ERVNUUk9ZXG4gICAgfSk7XG5cbiAgICBjb25zdCBzM09iamVjdFRhZ2dpbmdTdGF0ZW1lbnQgPSBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBhY3Rpb25zOiBbJ3MzOlB1dE9iamVjdFRhZ2dpbmcnXSxcbiAgICAgIHJlc291cmNlczogW2Ake2J1Y2tldC5idWNrZXRBcm59LypgXVxuICAgIH0pO1xuXG4gICAgY29uc3QgbGFtYmRhRm4gPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdzMy1ldmVudC1wcm9jZXNzb3InLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCxcbiAgICAgIGhhbmRsZXI6ICdsYW1iZGEuaGFuZGxlcicsXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoJ3NyYycpLFxuICAgICAgZnVuY3Rpb25OYW1lOiAnczMtZXZlbnQtcHJvY2Vzc29yJyxcbiAgICAgIG1lbW9yeVNpemU6IDI1NixcbiAgICAgIHRpbWVvdXQ6IER1cmF0aW9uLnNlY29uZHMoMzApXG4gICAgfSk7XG5cbiAgICBsYW1iZGFGbi5hZGRUb1JvbGVQb2xpY3koczNPYmplY3RUYWdnaW5nU3RhdGVtZW50KTtcbiAgICBsYW1iZGFGbi5yb2xlPy5hdHRhY2hJbmxpbmVQb2xpY3koXG4gICAgICBuZXcgaWFtLlBvbGljeSh0aGlzLCAnczMtb2JqZWN0LXRhZ2dpbmctcG9saWN5Jywge1xuICAgICAgICBzdGF0ZW1lbnRzOiBbczNPYmplY3RUYWdnaW5nU3RhdGVtZW50XSxcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICBjb25zdCBydWxlID0gbmV3IGV2ZW50cy5SdWxlKHRoaXMsICdydWxlJywge1xuICAgICAgZXZlbnRQYXR0ZXJuOiB7XG4gICAgICAgIHNvdXJjZTogWydhd3MuczMnXSxcbiAgICAgICAgZGV0YWlsVHlwZTogW1xuICAgICAgICAgICdPYmplY3QgQ3JlYXRlZCdcbiAgICAgICAgXSxcbiAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgYnVja2V0OiB7XG4gICAgICAgICAgICBuYW1lOiBbXG4gICAgICAgICAgICAgIGJ1Y2tldC5idWNrZXROYW1lXG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgcnVsZS5hZGRUYXJnZXQobmV3IHRhcmdldHMuTGFtYmRhRnVuY3Rpb24obGFtYmRhRm4sIHtcbiAgICAgIG1heEV2ZW50QWdlOiBEdXJhdGlvbi5ob3VycygyKSxcbiAgICAgIHJldHJ5QXR0ZW1wdHM6IDNcbiAgICB9KSk7XG5cbiAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdTM0J1Y2tldE5hbWUnLCB7IHZhbHVlOiBidWNrZXQuYnVja2V0TmFtZSB9KTtcbiAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdMYW1iZGFGdW5jdGlvbkFSTicsIHsgdmFsdWU6IGxhbWJkYUZuLmZ1bmN0aW9uQXJuIH0pO1xuICAgIG5ldyBDZm5PdXRwdXQodGhpcywgJ0V2ZW50QnJpZGdlUnVsZUFSTicsIHsgdmFsdWU6IHJ1bGUucnVsZUFybiB9KTtcbiAgICBcbiAgfVxufVxuIl19