import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import logging
from typing import Dict

logger = logging.getLogger(__name__)

# Email configuration
SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_USER = os.getenv("SMTP_USER", "lyontravel948@gmail.com")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")  # Will be set in .env
ADMIN_EMAIL = "lyontravel948@gmail.com"

def send_reservation_notification(reservation_data: Dict) -> bool:
    """
    Send email notification to admin when a new reservation is created
    """
    if not SMTP_PASSWORD:
        logger.warning("SMTP_PASSWORD not configured. Email not sent.")
        return False
    
    try:
        # Create message
        msg = MIMEMultipart()
        msg['From'] = SMTP_USER
        msg['To'] = ADMIN_EMAIL
        msg['Subject'] = f"Nouvelle demande de réservation - Lyon Travel"
        
        # Email body
        body = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #2563eb; border-radius: 10px;">
                    <h2 style="color: #2563eb; text-align: center;">🎫 Nouvelle demande de réservation</h2>
                    
                    <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #1e40af; margin-top: 0;">Informations du client:</h3>
                        <p><strong>Nom:</strong> {reservation_data.get('name', 'N/A')}</p>
                        <p><strong>Email:</strong> <a href="mailto:{reservation_data.get('email', '')}">{reservation_data.get('email', 'N/A')}</a></p>
                        <p><strong>Téléphone:</strong> <a href="tel:{reservation_data.get('phone', '')}">{reservation_data.get('phone', 'N/A')}</a></p>
                    </div>
                    
                    <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #d97706; margin-top: 0;">Détails de la demande:</h3>
                        <p><strong>Service demandé:</strong> {reservation_data.get('service', 'N/A')}</p>
                        <p><strong>Destination:</strong> {reservation_data.get('destination', 'Non spécifiée')}</p>
                        <p><strong>Date souhaitée:</strong> {reservation_data.get('date', 'Non spécifiée')}</p>
                    </div>
                    
                    {f'''<div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #374151; margin-top: 0;">Message:</h3>
                        <p>{reservation_data.get('message', 'Aucun message')}</p>
                    </div>''' if reservation_data.get('message') else ''}
                    
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
                        <p style="color: #6b7280; font-size: 14px;">Connectez-vous au panel admin pour gérer cette demande</p>
                    </div>
                </div>
            </body>
        </html>
        """
        
        msg.attach(MIMEText(body, 'html'))
        
        # Send email
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(msg)
        
        logger.info(f"Email notification sent to {ADMIN_EMAIL}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return False