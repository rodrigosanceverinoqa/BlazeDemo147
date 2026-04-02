// importações / bibliotecas / framework

import { test, expect } from '@playwright/test';

//função ou método
test('Fluxo de reserva - Cenário Positivo', async ({ page }) => {
  // Abre o navegador na URL
  await page.goto('https://www.blazedemo.com/');
  // Seleciona a origem como São Paolo
  await page.locator('select[name="fromPort"]').selectOption('São Paolo');
  // Seleciona o destino como London
  await page.locator('select[name="toPort"]').selectOption('London');
  // Clicar no botão Find Flights 
  await page.getByRole('button', { name: 'Find Flights' }).click();
  
  // Mudar de página
  // Verificação do texto esperado
  await expect(page.getByRole('heading')).toContainText('Flights from São Paolo to London:');
  
  // Escolheu uma linha, selecionou o voo 
  await page.getByRole('row', { name: 'Choose This Flight 43 Virgin' }).getByRole('button').click();
  
  // Muda de página
  // Preenchimento de campos no formulário
  await page.getByRole('textbox', { name: 'Name', exact: true }).click(); //clica no campo nome
  await page.getByRole('textbox', { name: 'Name', exact: true }).fill('Jose'); //preenche o nome
  await page.locator('#cardType').selectOption('amex'); //seleciona a bandeira do cartão
  await page.getByRole('checkbox', { name: 'Remember me' }).check(); //marca o checkbox "Remember me"
  await page.getByRole('button', { name: 'Purchase Flight' }).click(); //clica no botão "Purchase Flight"
  // Verificação do texto esperado na parte superior da página
  await expect(page.getByRole('heading')).toContainText('Thank you for your purchase today!');
  // Verificando se tem na tabala o preço
  await expect(page.locator('tbody')).toContainText('555 USD');
});