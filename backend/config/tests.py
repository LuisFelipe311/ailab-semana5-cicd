from django.test import TestCase, Client


class HealthCheckTests(TestCase):
    def test_health_endpoint_returns_ok(self):
        client = Client()
        response = client.get("/api/health/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "ok")
        self.assertIn("Configurar Docker", data["items"])