// outputs

output "cloudfront_id" {
  value = aws_cloudfront_distribution.s3_distribution.id
}

output "website_bucket" {
  value = aws_s3_bucket.website.id
}