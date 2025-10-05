import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Request, Response, NextFunction } from "express";
import { handleInputErrors } from "@/middleware/validation";
import { validationResult } from "express-validator";


vi.mock("express-validator", () => ({
  validationResult: vi.fn(),
}));

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = vi.fn().mockReturnThis();
  res.json = vi.fn().mockReturnThis();
  return res as Response;
};

describe("handleInputErrors Middleware", () => {
  let req: Partial<Request>;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = mockResponse();
    next = vi.fn();
    vi.clearAllMocks();
  });

  it("debe devolver 400 si hay errores de validación", () => {
    // Mock de validationResult con errores
    (validationResult as any).mockReturnValue({
      isEmpty: () => false,
      array: () => [{ msg: "Campo requerido", param: "name" }],
    });

    handleInputErrors(req as Request, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: [{ msg: "Campo requerido", param: "name" }],
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("debe llamar a next() si no hay errores de validación", () => {
    // Mock de validationResult sin errores
    (validationResult as any).mockReturnValue({
      isEmpty: () => true,
      array: () => [],
    });

    handleInputErrors(req as Request, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
